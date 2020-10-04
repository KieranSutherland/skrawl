import React, { useState } from "react"
import CanvasDraw from "react-canvas-draw"
import undoIcon from '../../resources/undo.png'
import clearIcon from '../../resources/clear.png'
import brushSizeIcon from '../../resources/brush_size.png'

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

function undoClick() {
	alert("undo")
}

function clearClick() {
	alert("cleared")
}

function smallBrushClick() {
	alert("set to small brush")
}

function largeBrushClick() {
	alert("set to large brush")
}

export default function Canvas() {
	const defaultBrushSize: number = 3
	const [canvas, setCanvas] = useState<CanvasDraw | null>()
	const [brushSize, setBrushSize] = useState<number>(defaultBrushSize)
	
	return (
		<div className="canvas">
			<CanvasDraw className="canvasDraw"
				ref={canvasRef => setCanvas(canvasRef)}
				canvasWidth="100%"
				canvasHeight="100%"
				brushColor="rgb(10,10,10)"
				brushRadius={brushSize}
				lazyRadius={0}
				hideGrid={true}
				hideInterface={true}
			/>
			<div className="canvasTools">
				<img className="canvasToolsImg" src={undoIcon} alt="Undo" onClick={() => canvas?.undo()} />
				<img className="canvasToolsImg" src={clearIcon} alt="Clear" onClick={() => canvas?.clear()} />
				<img className="canvasToolsImg smallBrush" src={brushSizeIcon} alt="Small brush" onClick={() => setBrushSize(defaultBrushSize)} />
				<img className="canvasToolsImg" src={brushSizeIcon} alt="Large brush" onClick={() => setBrushSize(8)} />
			</div>
		</div>
	)
}
