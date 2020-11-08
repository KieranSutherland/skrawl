import React from "react"
import CustomCssButton from '../mui/CustomCssButton'
import firebase from 'firebase/app'

export default function Submit(props: any) {
	const firestore = firebase.firestore();
	const currentUser = firebase.auth().currentUser!

	const handleSubmitClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		const lobbyRef = await firestore.collection('lobbies').doc(props.roomCode)
		const players: FirebaseLobbyPlayersField = await lobbyRef.get().then(lobby => lobby.get('players'))
		players.forEach(player => {
			if (player.uid === currentUser.uid) {
				player.finishedRound = true
				// get canvas data and save for current round
			}
		})
		await lobbyRef.update({
			players: players
		})
	}

	return (
		<div className="submit">
			<CustomCssButton text="Submit" width="100%" height="4.4vh" fontSize="calc(10px + 0.5vw)" onClick={handleSubmitClick} />
		</div>
	)
}
