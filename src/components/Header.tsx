import React from "react"
import firebase from 'firebase/app'
import { useHistory, useLocation } from "react-router-dom"
import * as firebaseHelper from '../utils/firebaseHelper'

export default function Header() {

	const location = useLocation()
	const history = useHistory()

	const clickHeader = async () => {
		if (location.pathname === "/game" && !window.confirm("Are you sure you want to quit your current game?")) {
			return
		}
		if(location.pathname === "/game" || location.pathname === "/private-lobby-creator") {
			await firebaseHelper.removeUserFromAllLobbies(firebase.auth().currentUser!)
		}
		history.push("/")
	}

    return (
        <header className="header">
			<div className="headerLink" onClick={clickHeader}>
				Skrawl
			</div>
        </header>
    )
}
  