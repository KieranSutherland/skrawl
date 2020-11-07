import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { Link } from "react-router-dom"
import { accentColor } from '../constants'

export default function Loading() {
	const [showStuckText, setShowStuckText] = useState<boolean>(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowStuckText(true)
		}, 3000); // 3 seconds
		return () => {
            clearTimeout(timeout)
          }
	}, [])

	return (
		<div className="loading">
			<ClipLoader
				size={'100%'}
				color={accentColor} />
			<div className="loadingStuck" hidden={!showStuckText}>
				<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
					Stuck? Click here
				</Link>
			</div>
		</div>
	)
}

