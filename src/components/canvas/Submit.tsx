import React from "react"
import CustomCssButton from '../mui/CustomCssButton'

function click() {
	alert("Are you sure you're finished?")
}

export default function Submit() {
	return (
		<div className="submit">
			<CustomCssButton text="Submit" width="6.8vw" height="4vh" fontSize="0.7vw" onClick={click} />
		</div>
	)
}
