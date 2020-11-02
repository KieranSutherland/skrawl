import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { accentColor } from '../constants'

export default function Loading() {
	return (
		<div className="loading">
			<ClipLoader
				size={'100%'}
				color={accentColor} />
		</div>
	)
}

