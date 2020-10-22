import React, { useState, useEffect } from 'react'
import Message from './Message'

export default function MessageLog() {
	const [messages, setMessages] = useState<Message[]>([
		new Message('sebastian', 'test message'),
			new Message('adam', 'test message'),
			new Message('steve', 'test message'),
			new Message('toby', 'test message'),
			new Message('gregory', 'test message'),
			new Message('sebastian', 'test message'),
			new Message('adam', 'test message'),
			new Message('steve', 'test message'),
			new Message('toby', 'test message'),
			new Message('gregory', 'test message'),
			new Message('adam', 'test message'),
			new Message('steve', 'test message'),
			new Message('toby', 'test message'),
			new Message('gregory', 'test message'),
			new Message('sebastian', 'test message'),
			new Message('adam', 'test message'),
			new Message('steve', 'test message'),
			new Message('toby', 'test message'),
			new Message('adam', 'test message'),
			new Message('steve', 'test message'),
			new Message('toby', 'test message'),
			new Message('gregory', 'test message that should go onto the next line hopefully'),
			new Message('sebastian', 'test message'),
			new Message('adam', 'test message'),
			new Message('steve', 'test message'),
			new Message('toby', 'test message')
	])

	// useEffect(() => {
	// 	if(socketRef) {
	// 		socketRef.current = io.connect('/')
	// 		socketRef.current.on("message", (message: Message) => {
	// 			console.log('Received message')
	// 			setMessages(oldMsgs => [message, ...oldMsgs])
	// 		})
	// 	}
	// }, [])

	return (
		<div className="messageLog">
			{messages.map((msg, index) => {
				return (<div className="message" key={index}>
							<div className="messageLogNickname">{msg.nickname}</div>
							<div>{msg.body}</div>
						</div>)
			})}
		</div>
	)
}