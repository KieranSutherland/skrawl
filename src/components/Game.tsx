import React, { useState } from 'react'
import CanvasMain from './canvas/CanvasMain'
import Players from './players/Players'
import ChatRoom from './ChatRoom/ChatRoom'

export default function Game() {
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
		<main className="game">
			<div className="playersDiv">
				<Players players={players} backgroundColor={'#ffffff'} />
			</div>
			<CanvasMain />
			<div className="chatRoomDiv">
				<ChatRoom />
			</div>
		</main>
	);
}
