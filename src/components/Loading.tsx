import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { accentColor } from '../constants'

export default function Loading(props: any) {
	return (
		<div className="loading">
			<ClipLoader
				size={'100%'}
				color={accentColor}
				loading={props.loading} />
		</div>
	)
}

