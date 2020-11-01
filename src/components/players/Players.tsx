import React, { useState, useEffect } from 'react'
import PlayerDetails from './PlayerDetails'
import Player from './Player'

export default function Players(props: any) {
	const [players, setPlayers] = useState<PlayerDetails[]>(
		[new PlayerDetails('kie'), 
			new PlayerDetails('sebastian'),
			new PlayerDetails('adam'),
			new PlayerDetails('steve'),
			new PlayerDetails('toby'),
			new PlayerDetails('gregory'),
			new PlayerDetails('sebastian'),
			new PlayerDetails('adam'),
			new PlayerDetails('steve'),
			new PlayerDetails('toby'),
			new PlayerDetails('gregory')
		]) // temporary while db isn't setup

	useEffect(() => {
		setPlayers(players => players) // retrieve latest players list from db
	}, [])

	return (
		<div className="players" style={{backgroundColor: props.backgroundColor, color: props.color}}>
			{(props.players as PlayerDetails[]).map((player, index) => {
				return <Player key={index} nickname={player.displayName}/>
			})}
		</div>
	)
}