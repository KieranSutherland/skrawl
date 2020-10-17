import React from 'react'
import SendMessage from './SendMessage'
import MessageLog from './MessageLog'

export default function ChatRoom() {
	return (
		<div className="chatRoom">
			<div className="chatRoomHeader">
				Chat room
			</div>
			<MessageLog />
			<SendMessage />
		</div>
	)
}