import React from "react"
import Help from './Help'
import Round from './Round'
import Scenario from './Scenario'
import Submit from './Submit'

export default function CanvasHeader() {
	return (
		<div className="canvasHeader">
			<Round />
			<ul>
				<li><Scenario /></li>
				<li><Submit /></li>
			</ul>
			<Help />
		</div>
	)
}
