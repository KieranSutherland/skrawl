import React, { useState, useEffect } from 'react'
import GameMain from './GameMain'
import Players from '../players/Players'
import ChatRoom from '../ChatRoom/ChatRoom'
import Loading from '../Loading'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'

export default function Game() {
	const firestore = firebase.firestore()
	const history = useHistory()
	const [roomCode, setRoomCode] = useState<string>('????')
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
	const [currentPlayer, setCurrentPlayer] = useState<FirebaseLobbyPlayerField | undefined>()
	const [currentLobby, setCurrentLobby] = useState<firebase.firestore.DocumentData>()

	const stopAuthListener = firebase.auth().onAuthStateChanged(user => setCurrentUser(user))

	// Ask the user if they're sure they want to refresh as it'll send them back to the home page
	window.onbeforeunload = (e: any) => e.preventDefault() // doesn't work?

	useEffect(() => {
		setup()
		return () => { stopAuthListener() }
	}, [currentUser])

	const setup = async () => {
		if (!currentUser) return
		// Once current user is defined, unsubscribe from auth listener
		stopAuthListener()

		const currentLobby = await firebaseHelper.getCurrentLobbyOfUser(currentUser!, history)
		if (!currentLobby) return

		const lobbyRef = firestore.collection('lobbies').doc(currentLobby!.id)
		setupSnapshotListener(lobbyRef)
	}

	const setupSnapshotListener = (lobbyRef: FirebaseDocumentRefData) => {
		const unsubscribeSnapshotListener = lobbyRef.onSnapshot(doc => {
			firebaseHelper.setupUnsubscriber(doc, currentUser?.uid, history, unsubscribeSnapshotListener)
			setRoomCode(doc!.id)
			setCurrentPlayer((doc!.get('players') as FirebaseLobbyPlayersField).find(player => player.uid === currentUser?.uid))
			setCurrentLobby(doc!.data()) // make sure this is set last so the other props are ready
		})
	}

	return (
		!currentLobby ? <main className="lobbySetup"><Loading /></main> :
		<main className="game">
			<div className="playersDiv">
				<Players hostUid={currentLobby['host']} players={currentLobby['players']} currentUserUid={currentUser ? currentUser.uid : ''} />
			</div>
			<div className="gameMain">
				<GameMain 
					currentUserUid={currentUser ? currentUser.uid : ''}
					currentPlayer={currentPlayer}
					currentLobby={currentLobby}
					roomCode={roomCode}/>
			</div>
			<div className="chatRoomDiv">
				<ChatRoom currentLobby={currentLobby} />
			</div>
		</main>
	);
}
