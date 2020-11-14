import React, { useEffect, useState } from "react"
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { accentColor } from '../../constants'

const tfFontSize = 'calc(8px + 0.55vw)'
const ftFontColor = '#000000'

const CustomCssTF = withStyles({
	root: {
		'& label': {
			color: ftFontColor,
			fontSize: tfFontSize
		},
		'& label.Mui-focused': {
			color: ftFontColor,
			fontSize: tfFontSize
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: accentColor,
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: accentColor,
			},
			'&:hover fieldset': {
				borderColor: accentColor,
			},
			'&.Mui-focused fieldset': {
				borderColor: accentColor,
			},
		},
	}
})(TextField)

export default function Scenario(props: any) {
	const [drawScenario, setDrawScenario] = useState<string>('')
	const MAX_SCENARIO_GUESS_LENGTH = 80

	useEffect(() => {
		if (props.assignedScenario?.phase === 'guess') {
			setDrawScenario(props.assignedScenario.attempt)
		}
		props.setGuessScenario('')
	}, [props.assignedScenario])

	const handleScenarioGuessChange = (guess: string) => {
		if (guess.length <= MAX_SCENARIO_GUESS_LENGTH) {
			props.setGuessScenario(guess)
		}
	}

	if (props.assignedScenario?.phase === 'guess') { // then user should draw
		return (
			<div className="scenario">
				<div>
					<h2>
						Draw Scenario
					</h2>
					{drawScenario}
				</div>
			</div>
		)
	} else { // then user should guess
		return (
			<div className="scenario">
				<CustomCssTF
					id="scenario-outlined-required"
					ref={props.guessScenarioRef}
					onChange={e => handleScenarioGuessChange(e.target.value)}
					value={props.guessScenario}
					label={"Scenario guess"}
					variant="outlined"
					required
					autoComplete="off"
					autoFocus
					fullWidth
					spellCheck={false}
					size="small"
					InputProps={{ style: { color: ftFontColor, fontSize: tfFontSize } }} />
			</div>
		)
	}
}
