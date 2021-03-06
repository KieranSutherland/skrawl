import React, { useState } from 'react'
import Player from './Player'

export default function Players(props: any) {
	return (
		<div className="players">
			{props.players && (props.players as FirebaseLobbyPlayersField).map((player, index) => {
				return (
					<div key={index}>
						<Player 
							isCurrentUser={props.currentUserUid === player.uid}
							displayName={player.displayName} 
							displayHostIcon={props.hostUid === player.uid}
							finishedRound={player.finishedRound}
							points={player.points} />
					</div>
				)
			})}
		</div>
	)
}