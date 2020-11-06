import React from 'react'
import Help from './Help'
import Scenario from './Scenario'
import Submit from './Submit'

export default function CanvasHeader(props: any) {
	return (
		<div className="canvasHeader">
			<div className="round">
				ROUND: {props.currentRound}/{props.maxRound}
			</div>
			<ul>
				<li><Scenario /></li>
				<li><Submit /></li>
			</ul>
			<Help />
		</div>
	)
}
