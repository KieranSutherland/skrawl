import React from "react"
import CustomCssButton from '../mui/CustomCssButton'

function click() {
	alert("Show scenario")
}

export default function Scenario(props: any) {

	const handleScenarioClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		alert('scenario')
	}

	return (
		<div className="scenario">
			<CustomCssButton text="Scenario" width="100%" height="4.2vh" fontSize="calc(10px + 0.5vw)" onClick={handleScenarioClick} />
		</div>
	)
}
