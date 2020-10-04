import React from 'react'
import CanvasMain from './canvas/CanvasMain'
import Players from './players/Players'
import ChatRoom from './ChatRoom/ChatRoom'

export default function Main() {
	return (
		<main className="main">
			<Players />
			<CanvasMain />
			<ChatRoom />
		</main>
	);
}
