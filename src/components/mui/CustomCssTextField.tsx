import React from "react"
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { accentColor } from '../../constants'

const CustomCssTF = withStyles({
	root: {
		'& label': {
			color: "#e6e6e6",
		},
		'& label.Mui-focused': {
			color: "#e6e6e6",
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


const CustomCssTextField = (props: any) => {

	return (
		<div>
			<CustomCssTF
				id={props.id}
				onChange={e => props.setTextMethod(e.target.value)}
				onKeyPress={e => {if(props.onKeyPress) props.onKeyPress(e)}}
				value={props.value}
				required={props.required}
				label={props.label}
				variant="outlined"
				autoComplete="off"
				autoFocus={props.autoFocus}
				fullWidth={true}
				spellCheck={false}
				InputProps={{ style: { color: "#e6e6e6"} }} />
		</div>
	)
}

export default React.memo(CustomCssTextField)