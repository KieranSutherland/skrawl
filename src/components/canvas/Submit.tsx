import React from "react"
import CustomCssButton from './CustomCssButton'

function click() {
	alert("Are you sure you're finished?")
}

export default function Submit() {
	return (
		<div className="submit">
			<CustomCssButton text="Submit" onClick={click} />
		</div>
	)
}
