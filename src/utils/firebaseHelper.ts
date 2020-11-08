import firebase from 'firebase/app'
import firebaseAdmin from 'firebase-admin'
import promisePool from 'es6-promise-pool'
import { useHistory } from "react-router-dom"

export const deleteEmptyLobbies = async (): Promise<any[]> => {
	const firestore = firebase.firestore();
	const lobbies: FirebaseCollectionRefData = firestore.collection('lobbies')
	var lobbyDeletionPromises: any[] = [] // collect removal promises to perform in one batch at the end for performance
	await lobbies.get().then(col => {
		col.docs.forEach(lobby => {
			if ((lobby.get('players') as FirebaseLobbyPlayersField).length === 0) {
				lobbyDeletionPromises.push(lobbies.doc(lobby.id).delete())
			}
		})
	})
	return Promise.all(lobbyDeletionPromises)
}

export const removeUserFromAllLobbies = async (user: firebase.User): Promise<any[]> => {
	const firestore = firebase.firestore();
	const lobbies: FirebaseCollectionRefData = firestore.collection('lobbies')
	const currentUserUid: string = user.uid!
	var lobbyRemovalPromises: any[] = [] // collect removal promises to perform in one batch at the end for performance
	await lobbies.get().then(col => {
		col.docs.forEach(lobby => {
			const lobbyPlayers: FirebaseLobbyPlayersField = lobby.get('players')
			const newMaxRound: number = lobby.get('maxRound') - 1
			if (lobbyPlayers.find(player => player['uid'] === currentUserUid)) {
				const newPlayersList = (lobby.get('players') as FirebaseLobbyPlayersField).filter(player => player['uid'] !== currentUserUid)
				// if player leaving is the host, pick new host and remove old host from lobby
				if (lobby.get('host') === currentUserUid && lobbyPlayers.length > 1) {
					const newHost = lobbyPlayers.find(player => player.uid !== currentUserUid)?.uid
					if (newHost) {
						lobbyRemovalPromises.push(
							lobbies.doc(lobby.id).update({
								players: newPlayersList,
								host: newHost,
								maxRound: newMaxRound
							})
						)
						return
					}
				}
				// if player leaving isn't host, remove user from lobby normally
				lobbyRemovalPromises.push(
					lobbies.doc(lobby.id).update({
						players: newPlayersList,
						maxRound: newMaxRound
					})
				)
			}
		})
	})
	return Promise.all(lobbyRemovalPromises)
}

export const getPlayerFieldOfUser = async (userUid: string, roomCode: string): Promise<FirebaseLobbyPlayerField | undefined> => {
	const firestore = firebase.firestore();
	return firestore.collection('lobbies').doc(roomCode).get().then(lobby => {
		return (lobby.get('players') as FirebaseLobbyPlayersField).find(player => player.uid === userUid)
	})
}

export const getCurrentLobbyOfUser = async (user: firebase.User, history: any | null): Promise<FirebaseQueryDocumentSnapshot | undefined> => {
	const firestore = firebase.firestore();
	const lobbies: FirebaseCollectionRefData = firestore.collection('lobbies')
	const currentUserUid: string = user?.uid!
	const currentLobbies: FirebaseQueryDocumentSnapshot[] = await lobbies.get().then(col => {
		return col.docs.filter(doc => {
			return (doc.get('players') as { uid: any, displayName: any }[]).find(player => player['uid'] === currentUserUid)
		})
	})
	if (currentLobbies.length !== 1 && history) {
		alert(`Sorry, we couldn't obtain a unique lobby with that information. (${currentLobbies.length} found)`)
		history.push('/')
		return
	}
	return currentLobbies.pop()
}

export const getLobbyByIdAndPassword = async (id: string, password: string): Promise<FirebaseQueryDocumentSnapshot | undefined> => {
	const firestore = firebase.firestore();
	const lobbies: FirebaseCollectionRefData = firestore.collection('lobbies')
	const currentLobbies: FirebaseQueryDocumentSnapshot[] = await lobbies.get().then(col => {
		return col.docs.filter(doc => doc.id === id && doc.get('password') === password)
	})
	if (currentLobbies.length !== 1) {
		return
	}
	return currentLobbies.pop()
}

const getInactiveUsers = async (users: firebaseAdmin.auth.UserRecord[], nextPageToken: string | undefined): Promise<firebaseAdmin.auth.UserRecord[]> => {
	const result = await firebaseAdmin.auth().listUsers(1000, nextPageToken)
	// Find users that have not signed in in the last 4 days
	const inactiveUsers = result.users.filter(
		user => Date.parse(user.metadata.lastSignInTime) < (Date.now() - 4 * 24 * 60 * 60 * 1000))

	// Concat with list of previously found inactive users if there was more than 1000 users
	users = users.concat(inactiveUsers)

	// If there are more users to fetch we fetch them recursively
	if (result.pageToken) {
		return getInactiveUsers(users, result.pageToken)
	}

	return users
}

const deleteUsers = (users: firebaseAdmin.auth.UserRecord[]) => {
	if (users.length <= 0) return

	const userToDelete = users.pop()
	if (!userToDelete) return

	return firebaseAdmin.auth().deleteUser(userToDelete.uid).then(() => {
		return console.log('Deleted user account', userToDelete.uid, 'because of inactivity')
	}).catch((error) => {
		return console.error('Deletion of inactive user account', userToDelete.uid, 'failed:', error)
	});
}

export const fullClean = async () => {
	const MAX_CONCURRENT = 3

	const inactiveUsers = await getInactiveUsers([], undefined)
	console.log('inactiveUsers: ' + inactiveUsers)
	// await new promisePool(() => deleteUsers(inactiveUsers), MAX_CONCURRENT).start()

	// get inactive users and remove them from lobbies
	await deleteEmptyLobbies()
}