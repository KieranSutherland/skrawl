import React from "react"
import Round from './Round'
import ShowHint from './ShowHint'
import Clear from './Clear'
import Submit from './Submit'

export default function CanvasUtils() {
	const roomNo = 5481

	return (
		<div className="canvasUtils">
			<div>
			<div className="roomNo">
					Room No. {roomNo}
				</div>
				<ul>
					<li><Round /></li>
					<li><ShowHint /></li>
					<li><Clear /></li>
					<li><Submit /></li>
				</ul>
				
			</div>
		</div>
	)
}
