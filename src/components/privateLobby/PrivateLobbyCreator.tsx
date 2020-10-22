import React, { useState } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import BackButton from '../BackButton'
import Players from '../players/Players'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { Link } from "react-router-dom"

export default function PrivateLobbyCreator() {
	const [sfw, setSfw] = useState<boolean>(true)
	const [roomCode, setRoomCode] = useState('3651')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSfw((event.target as HTMLInputElement).value == 'true')
	};

	return (
		<div className="lobbySetup">
			<BackButton />
			<div className="privateLobbyPlayerList">
				<Players backgroundColor={'#4e4e4e'} color={'#ffffff'} />
			</div>
			<div className="privateLobbySettings">
				<ul>
					<li style={{ boxShadow: 'none' }}>
						<div className="roomCode">
							Room Code
							<h1>
								{roomCode}
							</h1>
						</div>
					</li>
					<li style={{ boxShadow: 'none' }}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Scenario Choices</FormLabel>
							<RadioGroup aria-label="scenario_choices" name="scenario_choices1" value={sfw} onChange={handleChange}>
								<FormControlLabel value={true} control={<Radio />} label="SFW" />
								<FormControlLabel value={false} control={<Radio />} label="NSFW" />
							</RadioGroup>
						</FormControl>
					</li>
					<li>
						<CustomCssButton text="Copy invite link" width="15vw" height="8vh" fontSize="1.2vw" />
					</li>
					<li>
						<Link to="/game" style={{ textDecoration: 'none' }}>
							<CustomCssButton text="Start" width="15vw" height="8vh" fontSize="1.5vw" />
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

