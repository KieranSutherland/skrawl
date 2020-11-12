import React, { useRef, useEffect, useState } from "react"
import Canvas from './Canvas'
import CanvasHeader from './CanvasHeader'
import CanvasDraw from "react-canvas-draw"
import Timer from './Timer'

export default function CanvasMain(props: any) {
	const [canvasData, setCanvasData] = useState<string | null>(null)
	const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>()
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
				canvasRef={canvasRef} />
			<Timer currentLobby={props.currentLobby} roomCode={props.roomCode} />
			<Canvas setCanvasRefFunction={setCanvasRef} canvasRef={canvasRef} assignedScenario={assignedScenario} />
		</div>
	)
}
