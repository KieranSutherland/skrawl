import React from 'react'
import CanvasMain from '../canvas/CanvasMain'
import GameSummary from '../gameSummary/GameSummary'
import Winner from '../winner/Winner'

export default function GameMain(props: any) {

	if (props.currentLobby!['winners'] && props.currentLobby!['winners'].length !== 0) {
		return (
			<Winner 
				currentUserUid={props.currentUserUid}
				currentLobby={props.currentLobby}
				roomCode={props.roomCode} />
		)
	}
	else if (props.currentLobby!['currentRound'] > props.currentLobby!['maxRound']) {
		return (
			<GameSummary 
				currentUserUid={props.currentUserUid}
				currentLobby={props.currentLobby}
				roomCode={props.roomCode} />
		)
	} 
	else {
		return (
			<CanvasMain 
				currentUserUid={props.currentUserUid}
				currentLobby={props.currentLobby}
				roomCode={props.roomCode} />
		)
	}
}
