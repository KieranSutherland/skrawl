import React, { useState } from 'react'
import Player from './Player'

export default function Players(props: any) {
	const [players, setPlayers] = useState<FirebaseLobbyPlayersField>(
		[{displayName: 'kie', uid: 'saf0s7adfas', finishedRound: false}, 
		{displayName: 'sebastian', uid: 'saf0s7adfas1', finishedRound: false}, 
		{displayName: 'adam', uid: 'saf0s7adfas2', finishedRound: false}, 
		{displayName: 'steve', uid: 'saf0s7adfas3', finishedRound: true}, 
		{displayName: 'gregory', uid: 'saf0s7adfas4', finishedRound: false},
		{displayName: 'sebastian', uid: 'saf0s7adfas5', finishedRound: false}, 
		{displayName: 'adam', uid: 'saf0s7adfas6', finishedRound: false}, 
		{displayName: 'steve', uid: 'saf0s7adfas7', finishedRound: true}, 
		{displayName: 'gregory', uid: 'saf0s7adfas8', finishedRound: true},
		{displayName: 'sebastian', uid: 'saf0s7adfas99', finishedRound: false}, 
		{displayName: 'adam', uid: 'saf0s7adfas11', finishedRound: false}, 
		{displayName: 'steve', uid: 'saf0s7adfas12', finishedRound: false}, 
		{displayName: 'gregory', uid: 'saf0s7adfas14', finishedRound: false}
		]) // temporary while db isn't setup

	return (
		<div className="players">
			{props.players && (props.players as FirebaseLobbyPlayersField).map((player, index) => {
				return (
					<div key={index} style={{fontWeight: props.currentUserUid === player.uid ? 'bold' : undefined}}>
						<Player 
							displayName={player.displayName} 
							displayHostIcon={props.hostUid === player.uid}
							finishedRound={player.finishedRound} />
					</div>
				)
			})}
		</div>
	)
}