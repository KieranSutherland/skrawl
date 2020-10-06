import React from 'react'
import CustomCssButton from './mui/CustomCssButton'
import Players from './players/Players'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from "react-router-dom"

export default function PrivateLobbyCreator() {
	const [value, setValue] = React.useState('SFW');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

    return (
        <div className="lobbySetup">
			<div className="privateLobbyPlayerList">
				<Players backgroundColor={'#555454'} color={'#e6e6e6'}/>
			</div>
			<div className="privateLobbySettings">
				<ul>
					<li>
						<FormControl component="fieldset">
							<FormLabel component="legend">Scenario Choices</FormLabel>
							<RadioGroup aria-label="scenario_choices" name="scenario_choices1" value={value} onChange={handleChange}>
								<FormControlLabel value="SFW" control={<Radio />} label="SFW" />
								<FormControlLabel value="NSFW" control={<Radio />} label="NSFW" />
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

