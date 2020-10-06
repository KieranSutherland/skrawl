import React, { useState, useRef } from 'react'
import CustomCssButton from './mui/CustomCssButton'
import CustomCssTextField from './mui/CustomCssTextField'
import FormControl from '@material-ui/core/FormControl'
import { Link, useHistory } from "react-router-dom"

export default function Home() {
	const [nickname, setNickname] = useState<string>('')

	const history = useHistory()

    return (
        <div id="home">
            <div className="lobbySetup">
				<FormControl required>
				<ul>
					<li>
						<CustomCssTextField 
							id="outlined-required"
							value={nickname}
							onChangeMethod={setNickname}
							required={true}
							label="Nickname"
							inputLabelColor={"#e6e6e6"}
							inputTextColor={"#e6e6e6"} />
					</li>
					<li>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<CustomCssButton text="Public Lobby" width="20vw" height="8vh" fontSize="1.5vw" />
						</Link>
					</li>
					<li>
						<Link to="/private-lobby" style={{ textDecoration: 'none' }}>
							{/* <CustomCssButton text="Private Lobby" width="20vw" height="8vh" fontSize="1.5vw"  /> */}
							<CustomCssButton text="Private Lobby" width="20vw" height="8vh" fontSize="1.5vw" />
						</Link>
					</li>
				</ul>
				</FormControl>
			</div>
        </div>
    );
}

