import React from "react"
import Canvas from './Canvas'
import CanvasUtils from './CanvasUtils'
import Timer from './Timer'

export default function CanvasMain() {
	return (
		<div className="canvasMain">
			<CanvasUtils />
			<Timer />
			<Canvas />
		</div>
	)
}
