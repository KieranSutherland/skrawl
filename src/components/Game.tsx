import React, { useState, useEffect } from 'react'
import CanvasMain from './canvas/CanvasMain'
import Players from './players/Players'
import ChatRoom from './ChatRoom/ChatRoom'
import Loading from './Loading'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../utils/firebaseHelper'

export default function Game() {
	const firestore = firebase.firestore()
	const history = useHistory()
	const [roomCode, setRoomCode] = useState<string>('????')
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
	const [currentLobby, setCurrentLobby] = useState<firebase.firestore.DocumentData>()

	const stopAuthListener = firebase.auth().onAuthStateChanged(user => setCurrentUser(user))

	// Ask the user if they're sure they want to refresh as it'll send them back to the home page
	window.onbeforeunload = (e: any) => e.preventDefault() // does this actually work?

	useEffect(() => {
		setupGameListener()
	}, [currentUser])

	const setupGameListener = async () => {
		if (!currentUser) return
		const currentLobby = await firebaseHelper.getCurrentLobbyOfUser(currentUser!, history)
		if (!currentLobby) return

		const unsubscribeSnapshotListener = firestore.collection('lobbies').doc(currentLobby!.id).onSnapshot(doc => {
			// if player is no longer in the lobby, stop the listener
			if (!(doc!.get('players') as FirebaseLobbyPlayersField).map(player => player.uid).find(uid => uid === currentUser.uid)) {
				unsubscribeSnapshotListener()
			}
			setCurrentLobby(doc!.data())
			setRoomCode(doc!.id)
			if (doc!.get('started') === false) {
				unsubscribeSnapshotListener()
				alert('Game hasn\'t started, you shouldn\'t be here!')
				history.push('/')
			}
		})
		// Once current user is defined, unsubscribe from auth listener
		stopAuthListener()
		// console.log('final currentLobby: ' + JSON.stringify(currentLobby, getCircularReplacer()))
	}

	return (
		!currentLobby ? <main className="lobbySetup"><Loading /></main> :
		<main className="game">
			<div className="playersDiv">
				<Players players={currentLobby['players']} currentUserUid={currentUser ? currentUser.uid : ''} />
			</div>
			<CanvasMain 
				currentLobby={currentLobby}
				roomCode={roomCode} />
			<div className="chatRoomDiv">
				<ChatRoom currentLobby={currentLobby} />
			</div>
		</main>
	);
}
