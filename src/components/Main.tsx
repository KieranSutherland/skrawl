import React from 'react'
import Canvas from './canvas/Canvas'
import Players from './players/Players'
import ChatRoom from './ChatRoom/ChatRoom'

export default function Main() {

	return (
		<main className="main">
			<Players />
			<Canvas />
			<ChatRoom />
		</main>
	);
}
