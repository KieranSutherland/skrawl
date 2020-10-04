import React from "react"
import CustomCssButton from './CustomCssButton'

function click() {
	// var canvas = document.getElementsByClassName("canvasDraw")[0]
	// var context = canvas.getContext("2d")
}

export default function Clear() {
	return (
		<div className="clear">
			<CustomCssButton text="Clear" onClick={click} />
		</div>
	)
}
