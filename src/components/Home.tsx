import React, { useState, useEffect } from 'react'
import CustomCssButton from './mui/CustomCssButton'
import CustomCssTextField from './mui/CustomCssTextField'
import Loading from './Loading'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'

const getAuthDisplayName = () => {
	if (firebase.auth().currentUser && firebase.auth().currentUser!.displayName != null) {
		return firebase.auth().currentUser!.displayName!
	}
	return ''
}

export default function Home() {
	const history = useHistory()
	const [nickname, setNickname] = useState<string>(getAuthDisplayName())
	const [loading, setLoading] = useState<boolean>(false)
	var goToPage: string = '/'

	const stopAuthListener = firebase.auth().onAuthStateChanged(user => user && nickname === '' ? setNickname(getAuthDisplayName()) : '')

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		stopAuthListener()
		event.preventDefault()
		const auth = firebase.auth()
		if (auth.currentUser) { // if user already exists, skip new sign in
			if (auth.currentUser.displayName !== nickname) {
				auth.currentUser.updateProfile({ displayName: nickname })
			}
			setLoading(false)
			history.push(goToPage)
			return
		}
		console.log(`creating new user with nickname: ${nickname}`)
		const authPromise = auth.signInAnonymously()
		authPromise.finally(() => {
			auth.currentUser!.updateProfile({
				displayName: nickname
			})
			auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
			setLoading(false)
			history.push(goToPage)
		})
	}

	return (
		loading ? <div id="home"><div className="lobbySetup"><Loading /></div></div> :
		<div id="home">
			<div className="lobbySetup">
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
									width="100%"
									height="8vh"
									fontSize="3vmin" />
							</div>
						</li>
						<li>
							<div onClick={() => goToPage = "private-lobby"}>
								<CustomCssButton
									text="Private Lobby"
									width="100%"
									height="8vh"
									fontSize="3vmin" />
							</div>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}

