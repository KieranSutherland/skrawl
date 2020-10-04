import React from "react"
import CanvasDraw from "react-canvas-draw"

const canvasDefaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 800,
    canvasHeight: 800,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false
};

export default function Canvas() {
	return (
		<div className="canvas">
			<CanvasDraw className="canvasDraw"
				canvasWidth="100%"
				canvasHeight="100%"
				brushColor="rgb(10,10,10)"
				brushRadius={2}
				lazyRadius={0}
				hideGrid={true}
				hideInterface={true}
			/>
			<div className="canvas">

			</div>
		</div>
	)
}
