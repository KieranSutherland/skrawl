import React, { useState, useEffect } from 'react'
import CanvasMain from './canvas/CanvasMain'
import Players from './players/Players'
import ChatRoom from './ChatRoom/ChatRoom'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../utils/firebaseHelper'

export default function Game() {
	const firestore = firebase.firestore()
	const history = useHistory()
	// const [players, setPlayers] = useState<FirebaseLobbyPlayersField>(
	// 	[{ displayName: 'kie', uid: 'saf0s7adfas' },
	// 	{ displayName: 'sebastian', uid: 'saf0s7adfas1' },
	// 	{ displayName: 'adam', uid: 'saf0s7adfas2' },
	// 	{ displayName: 'steve', uid: 'saf0s7adfas3' },
	// 	{ displayName: 'gregory', uid: 'saf0s7adfas4' },
	// 	{ displayName: 'sebastian', uid: 'saf0s7adfas5' },
	// 	{ displayName: 'adam', uid: 'saf0s7adfas6' },
	// 	{ displayName: 'steve', uid: 'saf0s7adfas7' },
	// 	{ displayName: 'gregory', uid: 'saf0s7adfas8' },
	// 	{ displayName: 'sebastian', uid: 'saf0s7adfas99' },
	// 	{ displayName: 'adam', uid: 'saf0s7adfas11' },
	// 	{ displayName: 'steve', uid: 'saf0s7adfas12' },
	// 	{ displayName: 'gregory', uid: 'saf0s7adfas14' },
	// 	]) // temporary while db isn't setup
	const [players, setPlayers] = useState<FirebaseLobbyPlayersField>([])
	const [hostUid, setHostUid] = useState<string>('')
	const [sfw, setSfw] = useState<boolean>(true)
	const [messages, setMessages] = useState<string[]>([])
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

	const stopAuthListener = firebase.auth().onAuthStateChanged(user => setCurrentUser(user))

	useEffect(() => {
		setupGameListener()
	}, [currentUser])

	const setupGameListener = async () => {
		if (!currentUser) return
		const currentLobby = await firebaseHelper.getCurrentLobbyOfUser(currentUser!, history)
		if (!currentLobby) return

		firestore.collection('lobbies').doc(currentLobby!.id).onSnapshot(doc => {
			setPlayers(doc!.get('players'))
			setHostUid(doc!.get('host')) // do i need this one?
			setMessages(doc!.get('messages'))
			setSfw(doc!.get('settings') ? doc!.get('settings')['sfw'] : null)
		})

		// Once current user is defined, unsubscribe from auth listener
		stopAuthListener()
		// console.log('final currentLobby: ' + JSON.stringify(currentLobby, getCircularReplacer()))
	}

	return (
		<main className="game">
			<div className="playersDiv">
				<Players players={players} />
			</div>
			<CanvasMain />
			<div className="chatRoomDiv">
				<ChatRoom messages={messages} />
			</div>
		</main>
	);
}
