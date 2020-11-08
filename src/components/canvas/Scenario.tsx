import React, { useEffect, useState } from "react"
import CustomCssButton from '../mui/CustomCssButton'
import CustomCssTextField from '../mui/CustomCssTextField'
import * as firebaseHelper from '../../utils/firebaseHelper'

export default function Scenario(props: any) {
	const [guess, setGuess] = useState<string>('')
	const [render, setRender] = useState<ScenarioPhase>('draw')
	const [drawScenario, setDrawScenario] = useState<string>('')
	const [guessScenario, setGuessScenario] = useState<string>('')
	const [currentPlayerField, setCurrentPlayerField] = useState<FirebaseLobbyPlayerField | undefined>()

	useEffect(() => {
		if (props.currentUserUid && props.roomCode) {
			setupPlayerField()
		}
	}, [props.currentUserUid, props.roomCode])

	useEffect(() => {
		console.log(currentPlayerField?.scenarioObj)
		if (currentPlayerField && currentPlayerField.scenarioObj) {
			if (currentPlayerField?.scenarioObj.phase === 'draw') {
				console.log('setting to draw')
				setRender('draw')
				setDrawScenario(currentPlayerField.scenarioObj.scenario)
			} else {
				console.log('setting to guess')
				setRender('guess')
			}
		}
	}, [currentPlayerField])

	const setupPlayerField = async () => {
		setCurrentPlayerField(await firebaseHelper.getPlayerFieldOfUser(props.currentUserUid, props.roomCode))
	}

	const handleScenarioClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		alert('scenario')
	}
	if (render === 'draw') { // then user should draw
		return (
			<div className="scenario">
				<div>
					<h2>
						Draw Scenario
					</h2>
					{drawScenario}
					{/* <CustomCssButton text="Scenario" width="100%" height="4.2vh" fontSize="calc(10px + 0.5vw)" onClick={handleScenarioClick} /> */}
				</div>
			</div>
		)
	} else { // then user should guess
		return (
			<div className="scenario">
				<CustomCssTextField
							id="outlined-required"
							value={guess}
							setTextMethod={setGuess}
							required={true}
							autoFocus={true}
							label="Guess the scenario" />
			</div>
		)
	}
}
