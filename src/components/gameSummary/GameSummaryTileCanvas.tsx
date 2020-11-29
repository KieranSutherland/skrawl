import React from "react"
import CanvasDraw from "react-canvas-draw"

export default function GameSummaryTileCanvas(props: any) {
	return (
		<CanvasDraw
			catenaryColor={"#0a0302"}
			gridColor={"rgba(150,150,150,0.17)"}
			canvasWidth={props.size}
			canvasHeight={props.size}
			disabled={true}
			saveData={props.drawing}
			immediateLoading={true}
			hideGrid={true}
			hideInterface={true} />
	)
}
