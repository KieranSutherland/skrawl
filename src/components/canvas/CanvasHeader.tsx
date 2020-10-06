import React from "react"
import Help from './Help'
import Round from './Round'
import ShowHint from './ShowHint'
import Submit from './Submit'

export default function CanvasHeader() {
	return (
		<div className="canvasHeader">
			<div>
				<div className="help">
					<Help height="2.2vh" />
				</div>
				<div className="round">
					<Round />
				</div>
				<ul>
					<li><ShowHint /></li>
					<li><Submit /></li>
				</ul>
				
			</div>
		</div>
	)
}
