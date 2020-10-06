import React from "react"
import Canvas from './Canvas'
import CanvasHeader from './CanvasHeader'
import Timer from './Timer'

export default function CanvasMain() {
	return (
		<div className="canvasMain">
			<CanvasHeader />
			<Timer />
			<Canvas />
		</div>
	)
}
