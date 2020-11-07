import React from "react"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { accentColor } from '../../constants'

export default function CustomCssButton(props: any) {

	const CustomBtn = withStyles({
		root: {
			width: props.width,
			height: props.height,
			fontSize: props.fontSize,
			color: 'white',
			backgroundColor: accentColor,
			'&:hover': {
				backgroundColor: '#26967f'
			}
		}
	})(Button)

	return (
		<div>
			<CustomBtn 
				variant="contained" 
				type="submit"
				onClick={props.onClick} >
					{props.text}
			</CustomBtn>
		</div>
	)
}

