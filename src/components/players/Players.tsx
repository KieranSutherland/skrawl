import React, { useState, useEffect } from 'react'
import Player from './Player'

export default function Players(props: any) {
	const [players, setPlayers] = useState<FirebaseLobbyPlayersField>(
		[{displayName: 'kie', uid: 'saf0s7adfas'}, 
		{displayName: 'sebastian', uid: 'saf0s7adfas1'}, 
		{displayName: 'adam', uid: 'saf0s7adfas2'}, 
		{displayName: 'steve', uid: 'saf0s7adfas3'}, 
		{displayName: 'gregory', uid: 'saf0s7adfas4'},
		{displayName: 'sebastian', uid: 'saf0s7adfas5'}, 
		{displayName: 'adam', uid: 'saf0s7adfas6'}, 
		{displayName: 'steve', uid: 'saf0s7adfas7'}, 
		{displayName: 'gregory', uid: 'saf0s7adfas8'},
		{displayName: 'sebastian', uid: 'saf0s7adfas99'}, 
		{displayName: 'adam', uid: 'saf0s7adfas11'}, 
		{displayName: 'steve', uid: 'saf0s7adfas12'}, 
		{displayName: 'gregory', uid: 'saf0s7adfas14'},
		]) // temporary while db isn't setup

	return (
		<div className="players" style={{backgroundColor: props.backgroundColor, color: props.color}}>
			{props.players && (props.players as FirebaseLobbyPlayersField).map((player, index) => {
				return <Player key={index} displayName={player.displayName} displayHostIcon={props.hostUid === player.uid} />
			})}
		</div>
	)
}