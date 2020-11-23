import React from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import firebase from 'firebase/app'
import { useHistory } from 'react-router-dom'
import * as gameHelper from '../../utils/gameHelper'
import { accentColor } from '../../constants'

export default function Winner(props: any) {
	const firestore = firebase.firestore()
	const history = useHistory()
	const winners: FirebaseLobbyPlayersField = props.currentLobby['winners']
	const btnWidth = '100%'
	const btnHeight = '8vh'
	const btnFontSize = 'calc(10px + 0.8vw)'

	const handleNewGameClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		const players: FirebaseLobbyPlayersField = props.currentLobby['players']

		const newScenariosList = gameHelper.generateScenarioList(props.currentLobby['sfw'], players)

		players.forEach(player => player.points = 0)

		await firestore.collection('lobbies').doc(props.roomCode).update({
			currentRound: 1,
			scenarios: newScenariosList,
			players: players,
			winners: [],
			messages: []
		})
	}

	const handleQuitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		history.push('/')
	}

	return (
		<div className="winnerMain">
			<div className="winnerTitle">
				{
					winners.length === 1 ?
						<div>
							{winners[0].displayName}<span style={{color: accentColor}}> wins</span>!
						</div>
						:
						<div>
							<div>
								It's a <span style={{color: accentColor}}>tie</span>!
							</div>
							{
								winners.map((player, index) => {
									return (
										<span key={index}>
											{player.displayName}
											{
												index !== winners.length - 1 ?
													<span style={{color: accentColor}}> & </span>
													:
													<span><span style={{color: accentColor}}> win</span>!</span>
											}
										</span>
									)
								})
							}
						</div>
				}
			</div>
			<div className="winnerGameOptionsMain">
				<div className="winnerGameOption">
					{
						props.currentLobby['host'] === props.currentUserUid ?
							<CustomCssButton
								text="New Game"
								width={btnWidth}
								height={btnHeight}
								fontSize={btnFontSize}
								onClick={handleNewGameClick} />
							:
							<span>Waiting for host to start new game...</span>

					}
				</div>
				<div className="winnerGameOption">
					<CustomCssButton
						text="Quit"
						width={btnWidth}
						height={btnHeight}
						fontSize={btnFontSize}
						onClick={handleQuitClick} />
				</div>
			</div>
		</div>
	)

}
