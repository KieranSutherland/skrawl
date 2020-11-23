import React, { useEffect, useState, useLayoutEffect } from "react"
import Loading from '../Loading'
import GameSummaryTile from './GameSummaryTile'
import CustomCssButton from '../mui/CustomCssButton'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase/app'
import { useHistory } from 'react-router-dom'
import * as firebaseHelper from '../../utils/firebaseHelper'
import * as gameHelper from '../../utils/gameHelper'

export default function GameSummary(props: any) {
	const firestore = firebase.firestore()
	const history = useHistory()
	const scenarios: FirebaseScenariosField[] = props.currentLobby['scenarios']
	const players: FirebaseLobbyPlayersField = props.currentLobby['players']
	const [selectedScenario, setSelectedScenario] = useState<FirebaseScenariosField | null>(null)
	const [selectedScenarioDisplayName, setSelectedScenarioDisplayName] = useState<string>('')

	useEffect(() => {
		updateSelectedScenario()
	}, [scenarios, players.length])

	useLayoutEffect(() => {
		const updateSize = () => {
			history.go(0) // refresh page
		}
		window.addEventListener('resize', updateSize)
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	const updateSelectedScenario = async () => {
		const currentPlayers: FirebaseLobbyPlayersField = players
		if (!scenarios || scenarios.length === 0 || currentPlayers.length === 0 || props.currentLobby!['currentRound'] <= props.currentLobby!['maxRound']) {
			return
		}
		const scenario = scenarios[0]
		const lobbyRef = firestore.collection('lobbies').doc(props.roomCode)

		// if the player is no longer in the game, skip and goes to the next scenario
		if (!currentPlayers.find(player => player.uid === scenario.originalPlayer)) {
			goToNextScenario(lobbyRef)
		}

		// if a new scenario is being shown, reset the selected winner index
		if (selectedScenario?.originalPlayer !== scenario?.originalPlayer) {
			await lobbyRef.update({
				selectedWinnerIndex: null
			})
		}

		setSelectedScenario(scenario)
		setSelectedScenarioDisplayName(
			(await firebaseHelper.getPlayerFieldOfUser(scenario.originalPlayer, props.roomCode) as FirebaseLobbyPlayerField)?.displayName
		)
	}

	const handleVoteClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		const lobbyRef = firestore.collection('lobbies').doc(props.roomCode)

		// add point to player
		const playerWinnerUid = selectedScenario?.scenarioAttempts[props.currentLobby['selectedWinnerIndex']].attemptBy!;
		players.forEach(player => {
			if (player.uid === playerWinnerUid) {
				player.points = player.points ? player.points + 1 : 1
			}
		})

		goToNextScenario(lobbyRef)
	}

	const goToNextScenario = async (lobbyRef: FirebaseDocumentRefData) => {
		const removedSelectedScenarioList = scenarios.filter(scenario => scenario.originalPlayer !== selectedScenario?.originalPlayer)

		// If there are no more scenarios to go through, restart game
		if (removedSelectedScenarioList.length === 0) {
			restartGame(lobbyRef)
			return
		}

		await lobbyRef.update({
			scenarios: removedSelectedScenarioList,
			players: players
		})
	}

	const restartGame = async (lobbyRef: FirebaseDocumentRefData) => {
		// check if there's a winner yet
		const POINTS_TO_WIN = players.length + 2
		var winners = players.filter(player => player.points && player.points >= POINTS_TO_WIN)
		if (winners.length !== 0) {

			// multiple winner edge casing
			if (winners.length > 1) {
				winners.splice(1, winners.length).forEach(player => {
					// if more than 1 winner after the voting section, select player with most points
					if (player.points! > winners[0].points!) {
						winners = [player]
					}
					// if more than one winner with the same score, select them all as winners
					else if (player.points! === winners[0].points!) {
						winners.push(player)
					}
				})
			}

			// set the winner/s in the db which will push users to winner page
			await lobbyRef.update({
				players: players,
				winners: winners
			})
			return
		}

		// otherwise, start new set of rounds
		const newScenariosList = gameHelper.generateScenarioList(props.currentLobby['sfw'], players)
		await lobbyRef.update({
			currentRound: 1,
			scenarios: newScenariosList,
			players: players
		})
	}

	const handleTileClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, attemptNo: number) => {
		event.preventDefault()
		await firestore.collection('lobbies').doc(props.roomCode).update({
			selectedWinnerIndex: attemptNo
		})
	}

	if (!selectedScenario) {
		return (
			<div className="gameSummaryMain">
				<div className="gameSummary">
					<Loading />
				</div>
			</div>
		)
	} else {
		return (
			<div className="gameSummaryMain">
				<div className="gameSummaryHeader">
					<h1>{selectedScenarioDisplayName}'s summary</h1>
					<div className="gameSummaryHeaderContinue">
						{
							props.currentUserUid === selectedScenario?.originalPlayer ?
								props.currentLobby['selectedWinnerIndex'] ?
									<CustomCssButton
										text="Submit"
										width="10vw"
										height="5vh"
										fontSize="calc(10px + 0.5vw)"
										onClick={handleVoteClick} />
									:
									<h3>Select your favourite scenario</h3>
								:
								<h3>Waiting for {selectedScenarioDisplayName} to vote...</h3>
						}
					</div>
				</div>
				<div className="gameSummaryOriginal">
					<div>
						<h1>Original Scenario</h1>
						<h2>{selectedScenario?.scenarioAttempts[0].attempt}</h2>
					</div>
				</div>
				<div className="gameSummaryInner">
					<Grid container direction="row" spacing={3}>
						{
							selectedScenario?.scenarioAttempts &&
							(selectedScenario.scenarioAttempts as ScenarioAttempt[])
								.slice(1, selectedScenario.scenarioAttempts.length).map((attempt, index) => {
									const attemptNo = selectedScenario.scenarioAttempts.indexOf(attempt)
									return <GameSummaryTile
										attemptNo={attemptNo}
										attempt={attempt}
										selectedWinnerIndex={props.currentLobby['selectedWinnerIndex']}
										handleTileClickFunction={handleTileClick}
										isVotingUser={props.currentUserUid === selectedScenario?.originalPlayer} />
								})
						}
					</Grid>
				</div>
			</div>
		)
	}

}
