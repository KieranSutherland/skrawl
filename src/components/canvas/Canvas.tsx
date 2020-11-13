import React, { useEffect, useRef, useState } from "react"
import CanvasDraw from "react-canvas-draw"
import drawingCursor from '../../resources/favicon/favicon-32x32.png'
import eraserCursor from '../../resources/eraser_cursor.png'
import undoIcon from '../../resources/undo.png'
import clearIcon from '../../resources/clear.png'
import brushSizeIcon from '../../resources/brush_size.png'
import eraserIcon from '../../resources/eraser.png'

export default function Canvas(props: any) {
	const smallBrushSize: number = 2.5
	const largeBrushSize: number = 10
	const DEFAULT_BRUSH_COLOUR = '#0a0a0a'
	const canvasGuessRef = useRef<HTMLDivElement | null>(null)
	const [previousCanvasData, setPreviousCanvasData] = useState<string>()
	const [brushSize, setBrushSize] = useState<number>(smallBrushSize)
	const [brushColour, setBrushColour] = useState<string>(DEFAULT_BRUSH_COLOUR)
	const [eraserSelected, setEraserSelected] = useState<boolean>(false)
	const drawingCursorStyle = `url(${drawingCursor}) 1 32, auto`
	const eraserCursorStyle = `url(${eraserCursor}) 16 16, auto`

	useEffect(() => {
		// need to always set a default json value because of a bug with the CanvasDraw component
		setPreviousCanvasData(`{"lines":[{"points":[{"x":0,"y":0},{"x":0,"y":0}],"brushColor":"#ffffff","brushRadius":1}],"width":"100%","height":"100%"}`)
		if ((props.assignedScenario as ScenarioAttempt)?.phase === 'draw' && props.assignedScenario.attempt) {
			setPreviousCanvasData(props.assignedScenario.attempt)
		}
	}, [props.assignedScenario])

	if ((props.assignedScenario as ScenarioAttempt)?.phase === 'guess') {
		return (
			<div ref={props.canvasDivRef} className="canvas">
				<CanvasDraw 
					className="canvasDraw"
					style={{cursor: `${eraserSelected ? eraserCursorStyle : drawingCursorStyle}`}}
					ref={props.canvasRef}
					// loadTimeOffset={5}
					catenaryColor={"#0a0302"}
					gridColor={"rgba(150,150,150,0.17)"}
					canvasWidth="100%"
					canvasHeight="100%"
					brushColor={brushColour}
					brushRadius={brushSize}
					lazyRadius={0}
					disabled={false}
					imgSrc={""}
					saveData={previousCanvasData}
					// saveData={`{\"lines\":[{\"points\":[],\"brushColor\":\"${DEFAULT_BRUSH_COLOUR}\",\"brushRadius\":
					// 	${smallBrushSize}}],\"width\":\"100%\",\"height\":\"100%\"}`} // bug with CanvasDraw component so have to set this manually
					immediateLoading={true}
					hideGrid={true}
					hideInterface={true}
				/>
				<div className="canvasTools">
						<img className="canvasToolsImg" 
							src={clearIcon} 
							alt="Clear" 
							title="Clear" 
							onClick={() => props.canvasRef.current?.clear()} />
						<img className="canvasToolsImg" 
							src={undoIcon} 
							alt="Undo" 
							title="Undo" 
							onClick={() => props.canvasRef.current?.undo()} />
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
	} else if ((props.assignedScenario as ScenarioAttempt)?.phase === 'draw') {
		return (
			<div ref={canvasGuessRef} className="canvas">
				<CanvasDraw 
					className="canvasDraw"
					catenaryColor={"#0a0302"}
					gridColor={"rgba(150,150,150,0.17)"}
					canvasWidth={canvasGuessRef.current?.offsetWidth}
					canvasHeight={canvasGuessRef.current?.offsetHeight}
					disabled={true}
					saveData={previousCanvasData}
					immediateLoading={true}
					hideGrid={true}
					hideInterface={true}
				/>
			</div>
		)
	} else {
		return (
			<div></div> // put loading component here
		)
	}
	
}
