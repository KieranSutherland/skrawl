import React, { useState, useEffect } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import CustomCssTextField from '../mui/CustomCssTextField'
import BackButton from '../BackButton'
import TextField from '@material-ui/core/TextField'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'
import 'firebase/firestore';

export default function PrivateLobbyJoin() {
	const firestore = firebase.firestore(); // change to use explicit import at some point
	const history = useHistory()
	const [roomCode, setRoomCode] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!firebase.auth().currentUser) return

		await firebaseHelper.removeUserFromAllLobbies(firebase.auth().currentUser!)
		await firebaseHelper.deleteEmptyLobbies()

		// Check if lobby exists
		const lobby = await firebaseHelper.getLobbyByIdAndPassword(roomCode, password)
		if (!lobby) {
			alert('Lobby with that room code and password does not exist')
			return
		}
		
		// Add user to players list of lobby
		const lobbyPlayers: any[] = await (await firestore.collection('lobbies').doc(roomCode).get()).get('players')
		lobbyPlayers.push({
			displayName: firebase.auth().currentUser!.displayName,
			uid: firebase.auth().currentUser!.uid
		})
		await firestore.collection('lobbies').doc(roomCode).update({
			players: lobbyPlayers
		})

		history.push('/private-lobby-creator')
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
						<CustomCssButton text="Join" width="20vw" height="8vh" fontSize="1.5vw" />
					</li>
				</ul>
			</form>
		</div>
	);
}

