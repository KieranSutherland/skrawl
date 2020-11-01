import React, { useState } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import CustomCssTextField from '../mui/CustomCssTextField'
import BackButton from '../BackButton'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'
import * as routerHelper from '../../utils/routerHelper'

export default function PrivateLobbyCreate() {
	const firestore = firebase.firestore(); // change to use explicit import at some point
	const history = useHistory()
	const [password, setPassword] = useState('')
	const maxLobbies = 9999
	const minLobbies = 1000
	var goToPage = '/private-lobby-creator'

	// if(!firebase.auth().currentUser) {
	// 	history.push('/')	FIX ME
	// }
	
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const lobbies: FirebaseCollectionRefData = firestore.collection('lobbies')
		const isMaxLobbies: boolean = await lobbies.get().then( col => {
			if (col.size >= maxLobbies) {
				return true
			}
			return false
		})
		if (isMaxLobbies) {
			console.error('There are too many lobbies, skipping this lobby creation...')
			return
		}
		await firebaseHelper.removeUserFromAllLobbies(firebase.auth().currentUser!)
		await firebaseHelper.deleteEmptyLobbies()
		joinNewLobby(lobbies)
	}

	const joinNewLobby = async (lobbies: FirebaseCollectionRefData) => {
		const roomCode: number = await findUnusedRoomCode(lobbies)
		firestore.collection('lobbies').doc(roomCode.toString()).set({
			host: firebase.auth().currentUser?.uid,
			players: [{
				uid: firebase.auth().currentUser?.uid,
				displayName: firebase.auth().currentUser?.displayName
			}],
			password: password,
			settings: {
				SFW: false
			}
		})
		history.push(goToPage)
	}

	const findUnusedRoomCode = async (lobbies: FirebaseCollectionRefData): Promise<number> => {
		const existingLobbieKeys: number[] = await lobbies.get().then( col => {
			return col.docs.map(doc => Number(doc.id))
		})
		return generateRandomNumExcluding(existingLobbieKeys)
	}

	const generateRandomNumExcluding = (excludeNums: number[]): number => {
		var num = Math.floor(Math.random() * (Math.floor(maxLobbies) - Math.ceil(minLobbies) + 1)) + Math.ceil(minLobbies)
		if (excludeNums.indexOf(num) > -1) {
			return generateRandomNumExcluding(excludeNums)
		}
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

