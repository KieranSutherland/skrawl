import React, { useState, useEffect } from "react"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { accentColor } from '../../constants'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'

const CustomCssLinearProgress = withStyles({
	root: {
		width: '100%',
		height: '100%',
		backgroundColor: '#9fd8cd'
	},
	barColorPrimary: {
		backgroundColor: accentColor,
	}
})(LinearProgress);


export default function Timer(props: any) {
	const roundTimer = props.currentLobby['roundTimer']
	const firestore = firebase.firestore()
	const history = useHistory()
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (roundTimer) {
			if (!window.localStorage.getItem('targetDateTime')) {
				window.localStorage.setItem('targetDateTime', new Date(new Date().getTime() + (roundTimer * 1000)).getTime().toString())
			}
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					const secondsRemaining = (parseInt(window.localStorage.getItem('targetDateTime')!) - new Date().getTime()) / 1000
					if (secondsRemaining <= 0) {
						startNewRound()
						window.localStorage.setItem('targetDateTime', new Date(new Date().getTime() + (roundTimer * 1000)).getTime().toString())
						return 0
					}
					return 100 - (secondsRemaining / roundTimer * 100) // progress percentage
				});
			}, 300); // delay before next progress update on UI
	
			// executed when unmounting
			return () => {
				clearInterval(timer);
			};
		}
		// roomCode to initially update props, currentRound to force new round as soon as one user's timer finishes to try avoid desync
	}, [props.roomCode, props.currentLobby['currentRound']]); 

	const startNewRound = async () => {
		const lobbyRef = await firestore.collection('lobbies').doc(props.roomCode)
		var roundData: [number | null, FirebaseLobbyPlayersField] = await lobbyRef.get().then(lobby => {
			return [lobby.get('currentRound'), lobby.get('players')]
		})

		if (!roundData || !roundData[0] || !roundData[1]) {
			alert('Something went horribly wrong, we couldn\'t obtain the current round info, returning you back to home page...')
			history.push('/')
			return
		}

		const newRound = roundData[0] + 1
		const players = roundData[1]

		players.forEach(player => player.finishedRound = false)

		lobbyRef.update({
			currentRound: newRound,
			players: players
		})
	}

	return (
		<div className="timer">
			<CustomCssLinearProgress variant="determinate" value={progress} />
		</div>
	)
}
