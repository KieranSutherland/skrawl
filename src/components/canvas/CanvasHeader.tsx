import React from 'react'
import Help from './Help'
import Scenario from './Scenario'
import Submit from './Submit'

export default function CanvasHeader(props: any) {
	return (
		<div className="canvasHeader">
			<div className="round">
				ROUND: {props.currentLobby['currentRound']}/{props.currentLobby['maxRound']}
			</div>
			<ul>
				<li><Scenario roomCode={props.roomCode} /></li>
				<li><Submit roomCode={props.roomCode} /></li>
			</ul>
			<Help />
		</div>
	)
}
