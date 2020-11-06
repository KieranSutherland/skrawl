import React from "react"
import CustomCssButton from '../mui/CustomCssButton'

function click() {
	alert("Are you sure you're finished?")
}

export default function Submit() {
	return (
		<div className="submit">
			<CustomCssButton text="Submit" width="100%" height="4.2vh" fontSize="calc(10px + 0.5vw)" onClick={click} />
		</div>
	)
}
