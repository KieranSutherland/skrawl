import React, { useState, useEffect } from 'react'
import PlayerDetails from './PlayerDetails'
import Player from './Player'

export default function Players() {
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
		setPlayers(players) // retrieve latest player list from db
	})

	return (
		<div className="players">
			{players.map((player, index) => {
				return <Player nickname={player.nickname}/>
			})}
		</div>
	)
}