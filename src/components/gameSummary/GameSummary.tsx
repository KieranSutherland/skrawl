import React, { useEffect, useState } from "react"
import Loading from '../Loading'
import GameSummaryTile from './GameSummaryTile'
import CustomCssButton from '../mui/CustomCssButton'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'
import * as gameHelper from '../../utils/gameHelper'

export default function GameSummary(props: any) {
	const firestore = firebase.firestore()
	const scenarios = ((props.currentLobby['scenarios'] as FirebaseScenariosField[]))
	const [selectedScenario, setSelectedScenario] = useState<FirebaseScenariosField | null>(null)
	const [selectedScenarioDisplayName, setSelectedScenarioDisplayName] = useState<string>('')

	useEffect(() => {
		updateSelectedScenario()
	}, [props.currentLobby['scenarios']])

	const updateSelectedScenario = async () => {
		if (!scenarios || scenarios.length === 0) {
			return
		}
		const scenario = scenarios[0]
		// if the player is no longer in the game, skip and goes to the next scenario
		if (!(props.currentLobby['players'] as FirebaseLobbyPlayersField).find(player => player.uid === scenario.originalPlayer)) {
			updateSelectedScenario()
		}
		setSelectedScenario(scenario)
		setSelectedScenarioDisplayName(
			(await firebaseHelper.getPlayerFieldOfUser(scenario.originalPlayer, props.roomCode) as FirebaseLobbyPlayerField)?.displayName
		)
	}

	const restartGame = async () => {
		const lobbyRef = await firestore.collection('lobbies').doc(props.roomCode)
		const newScenariosList = gameHelper.generateScenarioList(props.currentLobby['sfw'], props.currentLobby['players'])
		console.log(newScenariosList)
		await lobbyRef.update({
			currentRound: 1,
			scenarios: newScenariosList
		})
	}

	const handleContinueClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		const lobbyRef = await firestore.collection('lobbies').doc(props.roomCode)
		const dbScenarios: FirebaseScenariosField[] = await (await lobbyRef.get()).get('scenarios')
		const removedSelectedScenarioList = dbScenarios.filter(scenario => scenario.originalPlayer !== selectedScenario?.originalPlayer)

		// If there are no more scenarios to go through, restart game
		if (removedSelectedScenarioList.length === 0) {
			restartGame()
			return
		}

		await lobbyRef.update({
			scenarios: removedSelectedScenarioList
		})
	}

	if (!selectedScenarioDisplayName) {
		return (
			<div className="gameSummary">
				<Loading />
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
								<CustomCssButton 
									text="Continue" 
									width="10vw" 
									height="5vh" 
									fontSize="calc(10px + 0.5vw)"
									onClick={handleContinueClick} />
								:
								<h4>Waiting for {selectedScenarioDisplayName} to continue...</h4>
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
						{selectedScenario?.scenarioAttempts &&
							(selectedScenario.scenarioAttempts as ScenarioAttempt[])
								.slice(1, selectedScenario.scenarioAttempts.length).map((attempt, index) => {
									return <GameSummaryTile index={index} attempt={attempt} />
								})}
					</Grid>
				</div>
			</div>
		)
	}

}
