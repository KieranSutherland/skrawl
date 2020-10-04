import React from "react"
import Help from './Help'
import Round from './Round'
import ShowHint from './ShowHint'
import Submit from './Submit'

export default function CanvasUtils() {
	return (
		<div className="canvasUtils">
			<div>
				<div className="help">
					<Help height="22px" />
				</div>
				<ul>
					<li><Round /></li>
					<li><ShowHint /></li>
					<li><Submit /></li>
				</ul>
				
			</div>
		</div>
	)
}
