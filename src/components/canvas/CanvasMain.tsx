import React, { useRef, useEffect, useState } from "react"
import Canvas from './Canvas'
import CanvasHeader from './CanvasHeader'
import CanvasDraw from "react-canvas-draw"
import Timer from './Timer'

export default function CanvasMain(props: any) {
	const canvasRef = useRef()
	const canvasDivRef = useRef()
	const [assignedScenario, setAssignedScenario] = useState<ScenarioAttempt | undefined>()

	useEffect(() => {
		setAssignedScenario(
			(props.currentLobby['scenarios'] as FirebaseScenariosField)
			.find(scenario => scenario.assignedPlayer === props.currentUserUid)
			?.scenarioAttempts[props.currentLobby['currentRound'] - 1]
		)
	}, [props.currentLobby['currentRound']])

	return (
		<div className="canvasMain">
			<CanvasHeader 
				currentLobby={props.currentLobby} 
				roomCode={props.roomCode} 
				currentUserUid={props.currentUserUid}
				assignedScenario={assignedScenario}
				canvasDivRef={canvasDivRef}
				canvasRef={canvasRef} />
			<Timer currentLobby={props.currentLobby} roomCode={props.roomCode} />
			<Canvas canvasDivRef={canvasDivRef} canvasRef={canvasRef} assignedScenario={assignedScenario} />
		</div>
	)
}
