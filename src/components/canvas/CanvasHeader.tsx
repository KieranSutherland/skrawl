import React, { useRef, useState } from 'react'
import Help from './Help'
import Scenario from './Scenario'
import CustomCssButton from '../mui/CustomCssButton'
import firebase from 'firebase/app'
import { useHistory } from "react-router-dom"
import * as firebaseHelper from '../../utils/firebaseHelper'
import * as gameHelper from '../../utils/gameHelper'

export default function CanvasHeader(props: any) {
	const firestore = firebase.firestore()
	const history = useHistory()
	const currentUser = firebase.auth().currentUser!
	const [guessScenario, setGuessScenario] = useState<string>('')

	const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const lobbyRef = await firestore.collection('lobbies').doc(props.roomCode)
		const players: FirebaseLobbyPlayersField = await lobbyRef.get().then(lobby => lobby.get('players'))

		// save current canvas to scenario object
		const validAttempt = await updateScenarioAttempt(lobbyRef)
		if (!validAttempt) {
			console.log('invalid attempt')
			return
		}

		// update player to finish round
		players.forEach(player => {
			if (player.uid === currentUser.uid) {
				player.finishedRound = true
			}
		})

		// if all players finished round, start new round (probably a bug if the last person to finish leaves the game)
		if (players.filter(player => player.finishedRound).length === players.length) {
			startNewRound(lobbyRef, players)
			return
		}

		await lobbyRef.update({
			players: players
		})
	}

	const updateScenarioAttempt = async (lobbyRef: FirebaseDocumentRefData): Promise<boolean> => {
		const scenarios = await lobbyRef.get().then(lobby => lobby.get('scenarios') as FirebaseScenariosField[])
		// await gameHelper.sleep(3000) used to replicate slow networks
		var assignedScenariosFound = 0
		var validAttempt = true

		scenarios.forEach(scenario => {
			if (scenario.assignedPlayer === currentUser.uid) {
				assignedScenariosFound = assignedScenariosFound + 1
				const latestScenarioAttempt = scenario.scenarioAttempts[scenario.scenarioAttempts.length - 1]
				// If it's a drawing submission, check if it's empty, and if it is, don't submit it
				if (((latestScenarioAttempt.attemptBy !== currentUser.uid && latestScenarioAttempt.phase === 'guess') || 
					(latestScenarioAttempt.attemptBy === currentUser.uid && latestScenarioAttempt.phase === 'draw')) 
					&& isDrawingEmpty(props.canvasRef.current?.getSaveData())) {
					alert('Please draw the scenario before submitting')
					validAttempt = false
					return
				}
				// Submit user's round's scenario
				if (latestScenarioAttempt.attemptBy === currentUser.uid) { // then user is resubmitting for the same turn
					scenario.scenarioAttempts[scenario.scenarioAttempts.length - 1] = {
						attempt: latestScenarioAttempt.phase === 'draw' ? getSaveDataWithExactDimensions() : guessScenario,
						attemptBy: currentUser.uid,
						attemptByDisplayName: currentUser.displayName!,
						phase: latestScenarioAttempt.phase
					}
				} else { // user is submitting for the first time this turn
					scenario.scenarioAttempts.push({
						attempt: latestScenarioAttempt.phase === 'draw' ? guessScenario : getSaveDataWithExactDimensions(),
						attemptBy: currentUser.uid,
						attemptByDisplayName: currentUser.displayName!,
						phase: latestScenarioAttempt.phase === 'draw' ? 'guess' : 'draw'
					})
				}
			}
		})

		if (!validAttempt) {
			return false
		}

		if (assignedScenariosFound !== 1) {
			alert('couldn\'t find the correlating unique scenario assigned to your user, returning you to the home page')
			history.push('/')
			return false
		}

		await lobbyRef.update({
			scenarios: scenarios
		})

		return true
	}

	const isDrawingEmpty = (saveData: string): boolean => {
		try {
			const saveDataJson = firebaseHelper.parseJson(saveData)
			if ((saveDataJson['lines'] as []).length < 2) {
				if ((saveDataJson['lines'] as []).length === 0) {
					return true
				}
				const potentialLine = (saveDataJson['lines'] as []).pop()
				if ((potentialLine!['points'] as []).length < 3) {
					return true
				}
			}
		}
		catch (error) {
			return true
		}
		return false
	}

	const getSaveDataWithExactDimensions = () => {
		const saveDataJson = firebaseHelper.parseJson(props.canvasRef.current?.getSaveData())
		saveDataJson['width'] = props.canvasDivRef.current?.offsetWidth
		saveDataJson['height'] = props.canvasDivRef.current?.offsetHeight
		return firebaseHelper.stringifyJson(saveDataJson)
	}

	const startNewRound = async (lobbyRef: FirebaseDocumentRefData, players: FirebaseLobbyPlayersField) => {
		const [scenarios, currentRound] = await lobbyRef.get().then(lobby => [lobby.get('scenarios'), lobby.get('currentRound')])

		// check all scenarios have been saved correctly
		const missingScenarios = scenarios.filter((scenario: FirebaseScenariosField) => scenario.scenarioAttempts.length - 1 !== currentRound)
		console.log(missingScenarios)
		if (missingScenarios.length !== 0) {
			console.log('missing scenarios')
			// untick finished boolean for the players and don't start new round
			missingScenarios.forEach((scenario: FirebaseScenariosField) => {
				const player = players.find(player => player.uid === scenario.assignedPlayer)
				if (player) {
					console.log('missing a scenario: ' + player.displayName)
					player.finishedRound = false
				}
			})
			await lobbyRef.update({
				players: players
			})
			alert('Because of database locking issues, someone will have to submit their scenario again. Trying to fix this currently but this is temporary fix, soz')
			return
		}

		// set all players back to unfinished
		players.forEach(player => {
			player.finishedRound = false
		})

		const [newRound, maxRound] = await lobbyRef.get().then(lobby => [lobby.get('currentRound') + 1, lobby.get('maxRound')])
		// if set of rounds are finished, no need to update scenarios
		if (newRound > maxRound) {
			console.log('finishing set of rounds...')
			await lobbyRef.update({
				currentRound: newRound,
				players: players
			})
			return
		}

		// re-assign scenarios to next player in the list
		scenarios.forEach((scenario: FirebaseScenariosField) => {
			const assignedPlayer = players.find(player => player.uid === scenario.assignedPlayer)
			if (!assignedPlayer) {
				console.error("couldn't find player assigned to scenario")
				return
			}
			// if last player in list, loop around to first player in list instead
			const indexOfPlayer = players.length === players.indexOf(assignedPlayer) + 1 ? 0 : players.indexOf(assignedPlayer) + 1
			scenario.assignedPlayer = players[indexOfPlayer].uid
		})
		
		console.log('starting new round...')
		await lobbyRef.update({
			currentRound: newRound,
			players: players,
			scenarios: scenarios
		})
	}

	return (
		<div className="canvasHeader">
			<div className="round">
				ROUND: {props.currentLobby['currentRound']}/{props.currentLobby['maxRound']}
			</div>
			<form onSubmit={handleSubmitClick}>
				<Scenario 
					guessScenario={guessScenario}
					setGuessScenario={setGuessScenario}
					currentLobby={props.currentLobby} 
					roomCode={props.roomCode} 
					assignedScenario={props.assignedScenario} />
				<div className="submit">
					<CustomCssButton text="Submit" width="100%" height="4.4vh" fontSize="calc(10px + 0.5vw)" />
				</div>
			</form>
			<Help />
		</div>
	)
}
