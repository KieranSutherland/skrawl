import React from 'react'
import SendMessage from './SendMessage'
import MessageLog from './MessageLog'

export default function ChatRoom(props: any) {
	return (
		<div className="chatRoom">
			<div className="chatRoomHeader">
				Chat
			</div>
			<MessageLog messages={props.currentLobby['messages']} />
			<SendMessage />
		</div>
	)
}