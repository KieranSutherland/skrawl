import React from 'react'
import CanvasMain from './canvas/CanvasMain'
import Players from './players/Players'
import ChatRoom from './ChatRoom/ChatRoom'

export default function Game() {
	return (
		<main className="game">
			<div className="playersDiv">
				<Players backgroundColor={'#ffffff'} />
			</div>
			<CanvasMain />
			<div className="chatRoomDiv">
				<ChatRoom />
			</div>
		</main>
	);
}
