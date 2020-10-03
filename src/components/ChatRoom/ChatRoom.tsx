import React from 'react'
import SendMessage from './SendMessage'
import MessageLog from './MessageLog'

export default function ChatRoom() {
	return (
		<div className="chatRoom">
			<MessageLog />
			<SendMessage />
		</div>
	)
}