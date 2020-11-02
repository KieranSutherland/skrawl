import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../utils/firebaseHelper'
import { accentColor } from '../constants'

export default function BackButton(props: any) {
	const history = useHistory()

	const handleClick = async () => {
		if (props.cleanLobbies) {
			await firebaseHelper.removeUserFromAllLobbies(firebase.auth().currentUser!)
			await firebaseHelper.deleteEmptyLobbies()
		}
		history.goBack()
	}

    return (
        <div className="backButton" onClick={handleClick}>
				<ArrowBackIosIcon style={{fill: accentColor}} />
				<div>Back</div>
        </div>
    );
}

