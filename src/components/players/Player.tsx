import React from 'react'
import crown from '../../resources/crown.png'
import finished from '../../resources/tick.png'

export default function Player(props: any) {
	return (
		<div className="player">
			{props.displayHostIcon && <img className="hostImg" src={crown} alt="(Host)" />}
			{props.displayName}
			{props.finishedRound && <img className="finishedImg" src={finished} alt="(Finished)" />}
		</div>
	)
}