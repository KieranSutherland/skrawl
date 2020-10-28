import React, { useState, useEffect } from 'react'
import CustomCssButton from './mui/CustomCssButton'
import CustomCssTextField from './mui/CustomCssTextField'
import Loading from './Loading'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const getAuthDisplayName = () => {
	if (firebase.auth().currentUser && firebase.auth().currentUser!.displayName != null) {
		return firebase.auth().currentUser!.displayName!
	}
	return ''
}

export default function Home() {
	const history = useHistory()
	const [nickname, setNickname] = useState<string>(getAuthDisplayName())
	var goToPage: string = '/'
	var loading: boolean = false

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		loading = true
		event.preventDefault()
		const auth = firebase.auth()
		if (auth.currentUser) { // if user already exists, skip new sign in
			if (auth.currentUser.displayName !== nickname) {
				auth.currentUser.updateProfile({ displayName: nickname })
			}
			history.push(goToPage)
			return
		}
		console.log(`creating new user with nickname: ${nickname}`)
		auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
		const authPromise = auth.signInAnonymously()
		authPromise.finally(() => {
			auth.currentUser!.updateProfile({
				displayName: nickname
			})
			history.push(goToPage)
		})
		loading = false
	}

	return (
		<div id="home">
			<div className="lobbySetup">
				<Loading loading={loading} />
				<form onSubmit={handleSubmit}>
					<ul>
						<li>
							<CustomCssTextField
								id="outlined-required"
								value={nickname}
								setTextMethod={setNickname}
								required={true}
								label="Nickname"
								autoFocus={true} />
						</li>
						<li>
							<div onClick={() => goToPage = "game"}>
								<CustomCssButton
									text="Public Lobby"
									width="20vw"
									height="8vh"
									fontSize="1.5vw" />
							</div>
						</li>
						<li>
							<div onClick={() => goToPage = "private-lobby"}>
								<CustomCssButton
									text="Private Lobby"
									width="20vw"
									height="8vh"
									fontSize="1.5vw" />
							</div>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}

