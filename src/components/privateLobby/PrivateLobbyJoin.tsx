import React, { useState, useEffect } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import CustomCssTextField from '../mui/CustomCssTextField'
import BackButton from '../BackButton'
import TextField from '@material-ui/core/TextField'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/firestore';

export default function PrivateLobbyJoin() {
	const firestore = firebase.firestore(); // change to use explicit import at some point
	const history = useHistory()
	const [roomCode, setRoomCode] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		console.log(firebase.auth().currentUser != null ? firebase.auth().currentUser!.displayName : '')
		console.log(firebase.auth().currentUser)
	}, [])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		history.push('/private-lobby-creator')
	}

	const handleJoin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		
	}

	return (
		<div className="lobbySetup">
			<BackButton />
			<form onSubmit={handleSubmit}>
				<ul>
					<li>
						<CustomCssTextField
							id="outlined-required"
							value={roomCode}
							setTextMethod={setRoomCode}
							required={true}
							autoFocus={true}
							label="Room Code" />
					</li>
					<li>
						<CustomCssTextField
							id="outlined-required"
							value={password}
							setTextMethod={setPassword}
							required={true}
							label="Password" />
					</li>
					<li>
						<div onClick={handleJoin}>
							<CustomCssButton text="Confirm" width="20vw" height="8vh" fontSize="1.5vw" />
						</div>
					</li>
				</ul>
			</form>
		</div>
	);
}

