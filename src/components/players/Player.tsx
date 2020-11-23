import React from 'react'
import crown from '../../resources/crown.png'
import finished from '../../resources/tick.png'

export default function Player(props: any) {
	return (
		<div className="player">
			{props.displayHostIcon && <img className="hostImg" src={crown} alt="(Host)" />}
			<div style={{fontWeight: props.isCurrentUser ? 'bold' : undefined}}>
				{props.displayName}
			</div>
			<div className="playerRoundDetails">
				{props.finishedRound && <img className="finishedImg" src={finished} alt="(Finished)" />}
				{props.points}
			</div>
		</div>
	)
}