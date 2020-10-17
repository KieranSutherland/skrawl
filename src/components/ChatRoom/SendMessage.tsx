import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Message from './Message'
import io from 'socket.io-client'

export default function SendMessage() {

	const [message, setMessage] = useState<string>('')

	const socketRef = useRef<typeof io.Socket>()

	useEffect(() => {
		if(socketRef) {
			socketRef.current = io.connect("http://localhost:8000/")
		}
	}, [])

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setMessage(event.target.value)
	}

	const sendMessage = () => {
		console.log('sendMessage')
		const messageObj: Message = new Message('nickname', message)
		setMessage('')
		socketRef.current?.emit("send-message", messageObj)
	}

	return (
		<div className="sendMessage">
			<FormControl fullWidth>
				<TextField 
					onChange={handleOnChange}
					onKeyPress={e => {if(e.key === 'Enter') sendMessage()}}
					value={message}
					label="Message" 
					variant="outlined"
					autoComplete="off" />
			</FormControl>
		</div>
	)
}