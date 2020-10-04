import React from "react"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { accentColor } from '../../constants'

const CustomBtn = withStyles({
	root: {
		width: '6.8vw',
		height: '4vh',
		fontSize: '0.7vw',
		color: 'white',
		backgroundColor: accentColor,
		'&:hover': {
			backgroundColor: '#26967f'
		}
	}
})(Button)

export default function CustomCssButton(props: any) {
	return (
		<div>
			<CustomBtn variant="contained" onClick={props.onClick}>{props.text}</CustomBtn>
		</div>
	)
}

