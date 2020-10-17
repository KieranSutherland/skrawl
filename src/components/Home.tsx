import React, { useState } from 'react'
import CustomCssButton from './mui/CustomCssButton'
import CustomCssTextField from './mui/CustomCssTextField'
import { useHistory } from "react-router-dom"

export default function Home() {
	const [nickname, setNickname] = useState<string>()
	var goToPage = '/'

	const history = useHistory()

	const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		history.push(goToPage)
	}

	return (
		<div id="home">
			<div className="lobbySetup">
				<form onSubmit={handleOnSubmit}>
					<ul>
						<li>
							<CustomCssTextField
								id="outlined-required"
								value={nickname}
								setTextMethod={setNickname}
								required={true}
								label="Nickname"
								inputLabelColor={"#e6e6e6"}
								autoFocus={true}
								inputTextColor={"#e6e6e6"} />
						</li>
						<li>
							<div onClick={() => goToPage="game"}>
								<CustomCssButton
									text="Public Lobby"
									width="20vw"
									height="8vh"
									fontSize="1.5vw" />
							</div>
						</li>
						<li>
							<div onClick={() => goToPage="private-lobby"}>
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

