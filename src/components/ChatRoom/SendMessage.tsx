import React, { useState, useEffect } from 'react'
import CustomCssTextField from '../mui/CustomCssTextField'
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'

export default function SendMessage() {
	const firestore = firebase.firestore()
	const [roomCode, setRoomCode] = useState<string | null>(null)
	const [message, setMessage] = useState<string>('')
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

	const stopAuthListener = firebase.auth().onAuthStateChanged(user => setCurrentUser(user))

	useEffect(() => {
		setupLobbyListener()
	}, [currentUser])

	const setupLobbyListener = async () => {
		if (!currentUser) return
		const currentLobby = await firebaseHelper.getCurrentLobbyOfUser(currentUser!, null)
		if (!currentLobby) return
		
		setRoomCode(currentLobby.id)

		// Once current user is defined, unsubscribe from auth listener
		stopAuthListener()
		// console.log('final currentLobby: ' + JSON.stringify(currentLobby, getCircularReplacer()))
	}

	const sendMessage = async () => {
		if (!roomCode || !currentUser || !currentUser!.displayName) {
			console.log('can\'t find room code or user, skipping message send')
		}
		var newMessages: FirebaseLobbyMessagesField = await (await firestore.collection('lobbies').doc(roomCode!).get()).get('messages')
		if (!newMessages) {
			newMessages = []
		}
		newMessages.push({
			displayName: currentUser!.displayName!,
			message: message
		})
		return firestore.collection('lobbies').doc(roomCode!).update({
			messages: newMessages
		})
	}

	const handleOnKeyPress = async (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			await sendMessage()
			setMessage('')
		}
	}

	return (
		<div className="sendMessage">
			<CustomCssTextField
				id="outlined-required"
				value={message}
				setTextMethod={setMessage}
				onKeyPress={handleOnKeyPress}
				label="Message" />
		</div>
	)
}