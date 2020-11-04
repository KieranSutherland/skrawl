import React from "react"
import CustomCssButton from '../mui/CustomCssButton'

function click() {
	alert("Show scenario")
}

export default function Scenario() {
	return (
		<div className="scenario">
			<CustomCssButton text="Scenario" width="100%" height="4vh" fontSize="calc(10px + 0.5vw)" onClick={click} />
		</div>
	)
}
