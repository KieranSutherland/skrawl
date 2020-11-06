import React from "react"
import Canvas from './Canvas'
import CanvasHeader from './CanvasHeader'
import Timer from './Timer'

export default function CanvasMain(props: any) {
	return (
		<div className="canvasMain">
			<CanvasHeader currentRound={props.currentRound} maxRound={props.maxRound} />
			<Timer roundTimer={props.roundTimer} roomCode={props.roomCode} />
			<Canvas />
		</div>
	)
}
