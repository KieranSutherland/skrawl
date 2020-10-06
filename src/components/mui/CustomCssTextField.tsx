import React from "react"
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { accentColor } from '../../constants'

export default function CustomCssTextField(props: any) {

	const CustomCssTextField = withStyles({
		root: {
			'& label': {
				color: props.inputLabelColor,
			},
			'& label.Mui-focused': {
				color: props.inputLabelColor,
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

	return (
		<div>
			<FormControl fullWidth>
				<CustomCssTextField 
					id={props.id} 
					// onChange={event => {props.onChangeMethod(event.target.value)}}
					// inputRef={input => props.inputRef(input)}
					// value={props.value}
					required={props.required}
					label={props.label} 
					variant="outlined"
					autoComplete="off"
					autoFocus={props.autoFocus}
					InputProps={{style: {color: props.inputTextColor}}} />
			</FormControl>
		</div>
	)
}

