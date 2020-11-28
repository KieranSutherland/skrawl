import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import Canvas from './Canvas'
import CanvasHeader from './CanvasHeader'
import Timer from './Timer'
import { useHistory } from 'react-router-dom'

export default function CanvasMain(props: any) {
	const history = useHistory()
	const canvasRef = useRef()
	const canvasDivRef = useRef()
	const [assignedScenario, setAssignedScenario] = useState<ScenarioAttempt | undefined>()

	useEffect(() => {
		setAssignedScenario(
			(props.currentLobby['scenarios'] as FirebaseScenariosField[])
			.find(scenario => scenario.assignedPlayer === props.currentUserUid)
			?.scenarioAttempts[props.currentLobby['currentRound'] - 1]
		)
	}, [props.currentLobby['currentRound']])

	useLayoutEffect(() => {
		const updateSize = () => {
			if (assignedScenario?.phase === 'draw') {
				history.go(0) // refresh page
			}
		}
		window.addEventListener('resize', updateSize)
		return () => window.removeEventListener('resize', updateSize)
	}, [assignedScenario])

	return (
		<div style={{height: '100%', width: '100%'}}>
			<CanvasHeader 
				currentLobby={props.currentLobby} 
				roomCode={props.roomCode} 
				assignedScenario={assignedScenario}
				canvasDivRef={canvasDivRef}
				canvasRef={canvasRef} />
			<Timer currentLobby={props.currentLobby} roomCode={props.roomCode} />
			<Canvas canvasDivRef={canvasDivRef} canvasRef={canvasRef} assignedScenario={assignedScenario} />
		</div>
	)
}
