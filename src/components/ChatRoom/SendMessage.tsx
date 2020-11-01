import React, { useState, useEffect } from 'react'
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

export default function SendMessage() {

	const [message, setMessage] = useState<string>('')

	const sendMessage = () => {

	}

	return (
		<div className="sendMessage">
			<CustomCssTF
				onChange={e => setMessage(e.target.value)}
				onKeyPress={e => { if (e.key === 'Enter') sendMessage() }}
				value={message}
				label="Message"
				variant="outlined"
				fullWidth={true}
				autoComplete="off" />
		</div>
	)
}