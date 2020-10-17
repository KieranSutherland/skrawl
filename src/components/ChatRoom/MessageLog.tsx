import React, { useState, useEffect, useRef } from 'react'
import Message from './Message'
import io from 'socket.io-client'

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

	const socketRef = useRef<typeof io.Socket>()

	useEffect(() => {
		if(socketRef) {
			socketRef.current = io.connect('/')
			socketRef.current.on("message", (message: Message) => {
				console.log('Received message')
				setMessages(oldMsgs => [message, ...oldMsgs])
			})
		}
	}, [])

	return (
		<div className="messageLog">
			{messages.map((msg, index) => {
				return (<div id="message" key={index} style={{padding: '4px 6px'}}>
							<div className="messageLogNickname">{msg.nickname}</div>
							<div>{msg.body}</div>
						</div>)
			})}
		</div>
	)
}