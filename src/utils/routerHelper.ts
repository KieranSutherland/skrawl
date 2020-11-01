import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'

export const redirectToHomeIfNoAuth = () => {
	const history = useHistory()
	if(!firebase.auth().currentUser) {
		// history.push('/')
	}
}