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
	const firestore = firebase.firestore()
	const history = useHistory()
	var targetDateTime = new Date(new Date().getTime() + (props.roundTimer * 1000))
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (props.roundTimer) {
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					const secondsRemaining = (targetDateTime.getTime() - new Date().getTime()) / 1000
					if (secondsRemaining <= 0) {
						// START NEW ROUND
						startNewRound()
						targetDateTime = new Date(new Date().getTime() + (props.roundTimer * 1000))
						return 0
					}
					return 100 - (secondsRemaining / props.roundTimer * 100) // progress percentage
				});
			}, 300); // delay before next progress update
	
			// executed when unmounting
			return () => {
				clearInterval(timer);
			};
		}
	}, [props]);

	const startNewRound = async () => {
		var newRound: number | null = await firestore.collection('lobbies').doc(props.roomCode).get().then(snapshot => {
			return snapshot.get('currentRound')
		})
		if (!newRound) {
			alert('Something went horribly wrong, we couldn\'t obtain the current round info, returning you back to home page...')
			history.push('/')
		}
		newRound!++
		firestore.collection('lobbies').doc(props.roomCode).update({
			currentRound: newRound
		})
	}

	return (
		<div className="timer">
			<CustomCssLinearProgress variant="determinate" value={progress} />
		</div>
	)
}
