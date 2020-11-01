import React from 'react'
import crown from '../../resources/crown.png'

export default function Player(props: any) {
	return (
		<div className="player">
			{props.displayHostIcon && <img className="hostImg" src={crown} alt="(Host)" />}
			{props.displayName}
		</div>
	)
}