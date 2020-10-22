import React, { useState, useEffect } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import CustomCssTextField from '../mui/CustomCssTextField'
import BackButton from '../BackButton'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/firestore';

export default function PrivateLobbyCreate() {
	const firestore = firebase.firestore(); // change to use explicit import at some point
	const history = useHistory()
	const [password, setPassword] = useState('')
	var goToPage = '/private-lobby-creator'

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const roomCode: number = findUnusedRoomCode()
		firestore.collection('lobbies').doc(roomCode.toString()).set({
			host: firebase.auth().currentUser?.uid,
			players: [firebase.auth().currentUser?.uid],
			password: password,
			settings: {
				SFW: false
			}
		})
		history.push(goToPage)
	}

	const findUnusedRoomCode = (): number => {
		const lobbies: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> = firestore.collection('lobbies')
		const existingLobbieKeys: number[] = [3751, 8413]
		return generateRandomNumExcluding(existingLobbieKeys)
	}

	const generateRandomNumExcluding = (excludeNums: number[]): number => {
		var num = Math.floor(Math.random() * (9999 - 1 + 1)) + 1
		excludeNums.forEach(excludeNum => {
			if (excludeNum === num) {
				return generateRandomNumExcluding(excludeNums)
			}
		})
		return num
	}

	return (
		<div className="lobbySetup">
			<BackButton />
			<form onSubmit={handleSubmit}>
				<ul>
					<li>
						<CustomCssTextField
							id="outlined-required"
							value={password}
							setTextMethod={setPassword}
							required={true}
							autoFocus={true}
							label="Create password" />
					</li>
					<li>
						<CustomCssButton text="Create" width="20vw" height="8vh" fontSize="1.5vw" />
					</li>
				</ul>
			</form>
		</div>
	);
}

