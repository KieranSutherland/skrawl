import React, { useState, useEffect } from "react"

interface RoundData {
	currentRound: number,
	maxRound: number
}

export default function Round() {
	const [roundData, setRoundData] = useState<RoundData>({
		currentRound: 1,
		maxRound: 3
	})

	useEffect(() => {
		setRoundData({
			currentRound: 1,
			maxRound: 3
		})
		
	}, [])

	return (
		<div className="round">
			ROUND: {roundData.currentRound}/{roundData.maxRound}
		</div>
	)
}
