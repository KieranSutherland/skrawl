import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'
import { accentColor } from '../../constants'

const CustomCssTextField = withStyles({
	root: {
	  '& label.Mui-focused': {
		color: accentColor,
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
	},
  })(TextField);

export default function SendMessage() {
	return (
		<div className="sendMessage">
			<FormControl fullWidth>
				<CustomCssTextField id="outlined-basic" label="Message" variant="outlined" />
			</FormControl>
		</div>
	)
}