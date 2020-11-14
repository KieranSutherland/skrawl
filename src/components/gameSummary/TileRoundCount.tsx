import React from "react"

export default function TileRoundCount(props: any) {
	return (
		<div className="tileRoundCount">
			<h3 style={{margin: 0}}>{props.count}</h3>
		</div>
	)
}
