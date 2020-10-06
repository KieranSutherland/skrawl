import React, { useState } from "react"
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import helpIcon from '../../resources/help.png'

export default function Help(props: any) {
	const [showHelp, setShowHelp] = useState(false);

	return (
		<div>
			<img src={helpIcon} alt="Help" style={{height: props.height}} onClick={() => setShowHelp(true)} />
			<Dialog
				maxWidth={'md'}
				open={showHelp}
				onClose={() => setShowHelp(false)}
				aria-labelledby="alert-dialog-title"
			>
				<DialogTitle id="alert-dialog-title">Instructions</DialogTitle>
				<DialogContent dividers>
				<DialogContentText>
					{"The best way to think about this game is to compare it to chinese whispers but in a drawing format."}
				</DialogContentText>
				<DialogContentText>
					{"At the start of the game, you choose one scenario from two options. You then have to draw "
					+ "that scenario and submit it within the given time frame."}
				</DialogContentText>
				<DialogContentText>
					{"After everyone has submitted their drawing (or the round timer has ended), your drawing will be sent "
					+ "to the player next in the list, and the player previous to you in the list will have their drawing "
					+ "sent to you. You then have to look at their drawing and guess what their scenario was and submit "
					+ "that guess before the round timer ends."}
				</DialogContentText>
				<DialogContentText>
					{"Same as the drawings being sent, your guess of the scenario will now be sent to the player next in "
					+ "the list and you will receive the guess from the player previous in the list to you. This has now "
					+ "done a cycle because you're now back with a scenario to draw. So as you did at the beginning, draw "
					+ "that scenario given to you and submit it."}
				</DialogContentText>
				<DialogContentText>
					{"This cycle will keep going until your original piece of work has cycled through every player in the game. "
					+ "Once the player previous in the list to you has submitted their guess/drawing of your work, that segment "
					+ "of the game has ended. You can then see a playback of each person's drawing's journey through the players "
					+ "and see how badly or surprisingly well the original concept stuck throughout."}
				</DialogContentText>
				</DialogContent>
				<DialogActions>
				<Button onClick={() => setShowHelp(false)} color="primary" autoFocus>
					Close
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
