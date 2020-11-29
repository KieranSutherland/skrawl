import React, { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import drawingCursor from '../../resources/favicon/favicon-32x32.png'
import eraserCursor from '../../resources/eraser_cursor.png'
import undoIcon from '../../resources/undo.svg'
import clearIcon from '../../resources/clear.svg'
import eraserIcon from '../../resources/eraser.svg'
import paletteIcon from '../../resources/palette.svg'
import { CompactPicker } from 'react-color'
import * as firebaseHelper from '../../utils/firebaseHelper'
import { useHistory } from 'react-router-dom'

interface brushProps {
	size: number,
	color: string
}

export default function Canvas(props: any) {
	const history = useHistory()
	const smallBrushSize: number = 2.5
	const largeBrushSize: number = 10
	const DEFAULT_BRUSH_COLOUR = '#0a0a0a'
	const canvasGuessRef = useRef<HTMLDivElement | null>(null)
	const [previousCanvasData, setPreviousCanvasData] = useState<string>()
	const [brushSize, setBrushSize] = useState<number>(smallBrushSize)
	const [brushColour, setBrushColour] = useState<string>(DEFAULT_BRUSH_COLOUR)
	const [eraserSelected, setEraserSelected] = useState<boolean>(false)
	const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
	const [brushBeforeEraser, setBrushBeforeEraser] = useState<brushProps | null>(null)
	const drawingCursorStyle = `url(${drawingCursor}) 1 32, auto`
	const eraserCursorStyle = `url(${eraserCursor}) 16 16, auto`

	useEffect(() => {
		// need to always set a default json value because of a bug with the CanvasDraw component
		setPreviousCanvasData(`{"lines":[{"points":[{"x":0,"y":0},{"x":0,"y":0}],"brushColor":"#ffffff","brushRadius":1}],"width":"100%","height":"100%"}`)
		if ((props.assignedScenario as ScenarioAttempt)?.phase === 'draw' && props.assignedScenario.attempt) {
			setPreviousCanvasData(props.assignedScenario.attempt)
		}
	}, [props.assignedScenario])

	const handleEraserClick = () => {
		if (eraserSelected && brushBeforeEraser) {
			setEraserSelected(false)
			setBrushColour(brushBeforeEraser.color)
			setBrushSize(brushBeforeEraser.size)
		} else {
			setEraserSelected(true)
			setBrushBeforeEraser({ size: brushSize, color: brushColour })
			setBrushSize(16)
			setBrushColour('#ffffff')
		}
	}

	const handleBrushSizeClick = (brushSize: number) => {
		setEraserSelected(false)
		setBrushSize(brushSize)
		if (brushBeforeEraser) {
			setBrushColour(brushBeforeEraser.color)
			setBrushBeforeEraser(null)
		} else {
			setBrushColour(brushColour)
		}
	}

	const handleCanvasChange = (canvas: CanvasDraw) => {
		setShowColorPicker(false)
		// if user has already submitted for the round, unsubmit so they can submit again
		if (props.currentPlayer.finishedRound) {
			firebaseHelper.updatePlayerFinishedRoundValue(props.currentLobby['players'] as FirebaseLobbyPlayersField, props.currentPlayer?.uid, props.roomCode, false)
		}
	}

	if ((props.assignedScenario as ScenarioAttempt)?.phase === 'guess') {
		return (
			<div ref={props.canvasDivRef} className="canvas">
				<CanvasDraw
					className="canvasDraw"
					style={{ cursor: `${eraserSelected ? eraserCursorStyle : drawingCursorStyle}` }}
					ref={props.canvasRef}
					onChange={(canvas: CanvasDraw) => handleCanvasChange(canvas)}
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
					immediateLoading={true}
					hideGrid={true}
					hideInterface={true}
				/>
				<div className="canvasTools">
					<img className="canvasTool canvasToolsImg"
						src={clearIcon}
						alt="Clear"
						title="Clear"
						onClick={() => props.canvasRef.current?.clear()} />
					<img className="canvasTool canvasToolsImg"
						src={undoIcon}
						alt="Undo"
						title="Undo"
						onClick={() => props.canvasRef.current?.undo()} />
					<img className="canvasTool canvasToolsImg"
						src={eraserIcon}
						alt="Eraser"
						title="Eraser"
						onClick={() => handleEraserClick()} />
					<img className="canvasTool canvasToolsImg"
						src={paletteIcon}
						alt="Color picker"
						title="Color picker"
						onClick={() => { setShowColorPicker(!showColorPicker) }} />
					<svg className="canvasTool" height="18" width="18">
						<circle
							cx="9" cy="9" r="8"
							stroke="black"
							strokeWidth="2"
							fill={eraserSelected ? brushBeforeEraser?.color : brushColour}
							onClick={() => handleBrushSizeClick(smallBrushSize)} />
					</svg>
					<svg className="canvasTool" height="24" width="24">
						<circle
							cx="12" cy="12" r="11"
							stroke="black"
							strokeWidth="2"
							fill={eraserSelected ? brushBeforeEraser?.color : brushColour}
							onClick={() => handleBrushSizeClick(largeBrushSize)} />
					</svg>
				</div>
				<div className="colorPicker">
					{
						showColorPicker && (
							<CompactPicker
								color={brushColour}
								onChange={(c: any) => {
									// if color picked but still on eraser, auto swap back to brush
									if (eraserSelected) {
										handleBrushSizeClick(brushBeforeEraser?.size ?? smallBrushSize)
									}
									setBrushColour(c.hex)
									setShowColorPicker(false)
								}} />
						)
					}
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
