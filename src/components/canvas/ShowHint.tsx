import React from "react"
import CustomCssButton from '../mui/CustomCssButton'

function click() {
	alert("Show hint")
}

export default function ShowHint() {
	return (
		<div className="showHint">
			<CustomCssButton text="Show Hint" width="6.8vw" height="4vh" fontSize="0.7vw" onClick={click} />
		</div>
	)
}
