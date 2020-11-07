import React, { useState } from "react"
import CanvasDraw from "react-canvas-draw"
import drawingCursor from '../../resources/favicon/favicon-32x32.png'
import eraserCursor from '../../resources/eraser_cursor.png'
import undoIcon from '../../resources/undo.png'
import clearIcon from '../../resources/clear.png'
import brushSizeIcon from '../../resources/brush_size.png'
import eraserIcon from '../../resources/eraser.png'

export default function Canvas() {
	const smallBrushSize: number = 2.5
	const largeBrushSize: number = 10
	const DEFAULT_BRUSH_COLOUR = '#0a0a0a'
	const [canvas, setCanvas] = useState<CanvasDraw | null>()
	const [brushSize, setBrushSize] = useState<number>(smallBrushSize)
	const [brushColour, setBrushColour] = useState<string>(DEFAULT_BRUSH_COLOUR)
	const [eraserSelected, setEraserSelected] = useState<boolean>(false)
	const drawingCursorStyle = `url(${drawingCursor}) 1 32, auto`
	const eraserCursorStyle = `url(${eraserCursor}) 16 16, auto`

	return (
		<div className="canvas">
			<CanvasDraw 
				className="canvasDraw"
				style={{cursor: `${eraserSelected ? eraserCursorStyle : drawingCursorStyle}`}}
				ref={canvasRef => setCanvas(canvasRef)}
				onChange={null}
				loadTimeOffset={5}
				catenaryColor={"#0a0302"}
				gridColor={"rgba(150,150,150,0.17)"}
				canvasWidth="100%"
				canvasHeight="100%"
				brushColor={brushColour}
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
					<img className="canvasToolsImg" 
						src={clearIcon} 
						alt="Clear" 
						title="Clear" 
						onClick={() => canvas?.clear()} />
					<img className="canvasToolsImg" 
						src={undoIcon} 
						alt="Undo" 
						title="Undo" 
						onClick={() => canvas?.undo()} />
					<img className="canvasToolsImg" 
						src={eraserIcon} 
						alt="Eraser" 
						title="Eraser" 
						onClick={() => {setEraserSelected(true); setBrushSize(16); setBrushColour('#ffffff')}} />
					<img className="canvasToolsImg smallBrush" 
						src={brushSizeIcon} 
						alt="Small brush" 
						title="Small brush" 
						onClick={() => {setEraserSelected(false); setBrushSize(smallBrushSize); setBrushColour(DEFAULT_BRUSH_COLOUR)}} />
					<img className="canvasToolsImg" 
						src={brushSizeIcon} 
						alt="Large brush" 
						title="Large brush" 
						onClick={() => {setEraserSelected(false); setBrushSize(largeBrushSize); setBrushColour(DEFAULT_BRUSH_COLOUR)}} />
			</div>
		</div>
	)
}
