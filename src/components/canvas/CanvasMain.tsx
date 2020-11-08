import React from "react"
import Canvas from './Canvas'
import CanvasHeader from './CanvasHeader'
import Timer from './Timer'

export default function CanvasMain(props: any) {
	return (
		<div className="canvasMain">
			<CanvasHeader currentLobby={props.currentLobby} roomCode={props.roomCode} currentUserUid={props.currentUserUid} />
			<Timer currentLobby={props.currentLobby} roomCode={props.roomCode} />
			<Canvas />
		</div>
	)
}
