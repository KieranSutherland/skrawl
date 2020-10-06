import React, { useState } from "react"
import CanvasDraw from "react-canvas-draw"
import undoIcon from '../../resources/undo.png'
import clearIcon from '../../resources/clear.png'
import brushSizeIcon from '../../resources/brush_size.png'

export default function Canvas() {
	const smallBrushSize: number = 2.5
	const largeBrushSize: number = 10
	const [canvas, setCanvas] = useState<CanvasDraw | null>()
	const [brushSize, setBrushSize] = useState<number>(smallBrushSize)

	return (
		<div className="canvas">
			<CanvasDraw className="canvasDraw"
				ref={canvasRef => setCanvas(canvasRef)}
				onChange={null}
				loadTimeOffset={5}
				catenaryColor={"#0a0302"}
				gridColor={"rgba(150,150,150,0.17)"}
				canvasWidth="100%"
				canvasHeight="100%"
				brushColor="rgb(10,10,10)"
				brushRadius={brushSize}
				lazyRadius={0}
				disabled={false}
				imgSrc={""}
				saveData={""}
				immediateLoading={false}
				hideGrid={true}
				hideInterface={true}
			/>
			<div className="canvasTools">
				<img className="canvasToolsImg" src={undoIcon} alt="Undo" onClick={() => canvas?.undo()} />
				<img className="canvasToolsImg" src={clearIcon} alt="Clear" onClick={() => canvas?.clear()} />
				<img className="canvasToolsImg smallBrush" src={brushSizeIcon} alt="Small brush" onClick={() => setBrushSize(smallBrushSize)} />
				<img className="canvasToolsImg" src={brushSizeIcon} alt="Large brush" onClick={() => setBrushSize(largeBrushSize)} />
			</div>
		</div>
	)
}
