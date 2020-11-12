import React, { useRef, useState } from 'react'
import Help from './Help'
import Scenario from './Scenario'
import CustomCssButton from '../mui/CustomCssButton'
import firebase from 'firebase/app'
import { useHistory } from "react-router-dom"
import * as firebaseHelper from '../../utils/firebaseHelper'

export default function CanvasHeader(props: any) {
	const firestore = firebase.firestore()
	const history = useHistory()
	const currentUser = firebase.auth().currentUser!
	const [guessScenario, setGuessScenario] = useState<string>('')

	const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log('submit clicked')
		const lobbyRef = await firestore.collection('lobbies').doc(props.roomCode)

		// save current canvas to scenario object
		const validAttempt = await updateScenarioAttempt(lobbyRef)
		if (!validAttempt) {
			console.log('invalid attempt')
			return
		}

		// update player to finish round
		const players: FirebaseLobbyPlayersField = await lobbyRef.get().then(lobby => lobby.get('players'))

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
		const scenarios = await lobbyRef.get().then(lobby => lobby.get('scenarios') as FirebaseScenariosField)
		var assignedScenariosFound = 0
		var validAttempt = true

		scenarios.forEach(scenario => {
			if (scenario.assignedPlayer === props.currentUserUid) {
				console.log('found the unique scenario')
				assignedScenariosFound = assignedScenariosFound + 1
				const latestScenarioAttempt = scenario.scenarioAttempts[scenario.scenarioAttempts.length - 1]
				// If it's a drawing submission, check if it's empty, and if it is, don't submit it
				if (((latestScenarioAttempt.attemptBy !== props.currentUserUid && latestScenarioAttempt.phase === 'guess') || 
					(latestScenarioAttempt.attemptBy === props.currentUserUid && latestScenarioAttempt.phase === 'draw')) 
					&& isDrawingEmpty(props.canvasRef?.getSaveData())) {
					alert('Please draw the scenario before submitting')
					validAttempt = false
				}
				// Submit user's round's scenario
				if (latestScenarioAttempt.attemptBy === props.currentUserUid) { // then user is resubmitting for the same turn
					console.log('resubmitting')
					scenario.scenarioAttempts[scenario.scenarioAttempts.length - 1] = {
						attempt: latestScenarioAttempt.phase === 'draw' ? props.canvasRef.getSaveData() : guessScenario,
						attemptBy: props.currentUserUid,
						phase: latestScenarioAttempt.phase
					}
				} else { // user is submitting for the first time this turn
					console.log('pushing new')
					scenario.scenarioAttempts.push({
						attempt: latestScenarioAttempt.phase === 'draw' ? guessScenario : props.canvasRef.getSaveData(),
						attemptBy: props.currentUserUid,
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
			const jsonObj = firebaseHelper.parseJson(saveData)
			if ((jsonObj['lines'] as []).length < 2) {
				if ((jsonObj['lines'] as []).length === 0) {
					return true
				}
				const potentialLine = (jsonObj['lines'] as []).pop()
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

	const startNewRound = async (lobbyRef: FirebaseDocumentRefData, players: FirebaseLobbyPlayersField) => {
		// set all players back to unfinished
		players.forEach(player => {
			player.finishedRound = false
		})
		// re-assign scenarios to next player in the list
		const scenarios = await lobbyRef.get().then(lobby => lobby.get('scenarios') as FirebaseScenariosField)
		scenarios.forEach(scenario => {
			console.log('looping through scenario...')
			// console.log('players: ' + players)
			// console.log('scenario.assignedPlayer: ' + scenario.assignedPlayer)
			const assignedPlayer = players.find(player => player.uid === scenario.assignedPlayer)
			if (!assignedPlayer) {
				console.error("couldn't find player assigned to scenario")
				return
			}
			// if last player in list, loop around to first player in list instead
			const indexOfPlayer = players.length === players.indexOf(assignedPlayer) + 1 ? 0 : players.indexOf(assignedPlayer) + 1
			scenario.assignedPlayer = players[indexOfPlayer].uid
		})
		
		const newRound = await lobbyRef.get().then(lobby => lobby.get('currentRound')) + 1
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
					assignedScenario={props.assignedScenario}
					currentUserUid={props.currentUserUid} />
				<div className="submit">
					<CustomCssButton text="Submit" width="100%" height="4.4vh" fontSize="calc(10px + 0.5vw)" />
				</div>
			</form>
			<Help />
		</div>
	)
}
