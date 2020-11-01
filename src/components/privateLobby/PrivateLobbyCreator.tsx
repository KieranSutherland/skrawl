import React, { useState, useEffect } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import BackButton from '../BackButton'
import Players from '../players/Players'
import { withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'
import { accentColor } from '../../constants'

const CustomCssRadio = withStyles({
	root: {
	  color: accentColor,
	  '&$checked': {
		color: accentColor,
	  },
	},
	checked: {},
  })((props: RadioProps) => <Radio color="default" {...props} />);

export default function PrivateLobbyCreator() {
	const firestore = firebase.firestore(); // change to use explicit import at some point
	const history = useHistory()
	const [sfw, setSfw] = useState<boolean>(true)
	const [roomCode, setRoomCode] = useState<string>('')
	const [players, setPlayers] = useState<FirebaseLobbyPlayersField[]>([])
	const [hostUid, setHostUid] = useState<string>('')
	const MIN_PLAYERS = 4
	const MAX_PLAYERS = 64
	var currentLobby: FirebaseQueryDocumentSnapshot | undefined = undefined
	
	const getCircularReplacer = () => {
		const seen = new WeakSet();
		return (key: any, value: any) => {
			if (typeof value === "object" && value !== null) {
				if (seen.has(value)) {
					return;
				}
				seen.add(value);
			}
			return value;
		};
	};

	
	useEffect(() => {
		if (!firebase.auth().currentUser?.uid) {
			// history.push('/')
			return
		}
		// console.log('creator uid: ' + firebase.auth().currentUser?.uid)
		updateCurrentLobby()
	}, [firebase.auth().currentUser])


	async function updateCurrentLobby() {
		if (!firebase.auth().currentUser) return
		currentLobby = await firebaseHelper.getCurrentLobbyOfUser(firebase.auth().currentUser!, history)
		if (!currentLobby) return
		
		setRoomCode(currentLobby!.id)
		setPlayers(currentLobby!.get('players'))
		setHostUid(currentLobby!.get('host'))
		// console.log('players: ' + JSON.stringify(currentLobby!.get('players'), getCircularReplacer()))
		// console.log('final currentLobby: ' + JSON.stringify(currentLobby, getCircularReplacer()))
	}


	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSfw((event.target as HTMLInputElement).value === 'true')
	};

	const handleStartClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (players.length < MIN_PLAYERS) {
			alert(`You need ${MIN_PLAYERS} or more players to start a game`)
			return
		} else if (players.length > MAX_PLAYERS) {
			alert(`You need less than ${MAX_PLAYERS} players to start a game`)
			return
		}
		// set lobby settings and some boolean to say game has started
		history.push('/game')
	}

	return (
		<div className="lobbySetup">
			<BackButton />
			<div className="privateLobbyPlayerList">
				{/* Players: (11/16) */}
				<Players players={players} backgroundColor={'#444444'} color={'#ffffff'} hostUid={hostUid} />
			</div>
			<div className="privateLobbySettings">
				<ul>
					<li style={{ boxShadow: 'none' }}>
						<div className="roomCode">
							Room Code
							<h1>{roomCode}</h1>
						</div>
					</li>
					{/* <li style={{ boxShadow: 'none' }}>
						Password
					</li> */}
					<li style={{ boxShadow: 'none' }}>
						<FormControl component="fieldset">
							Scenario Choices
							<RadioGroup 
								aria-label="scenario_choices" 
								name="scenario_choices1" 
								value={sfw} 
								onChange={handleChange} 
								style={{marginLeft: '2%'}}>
								<FormControlLabel value={true} control={<CustomCssRadio />} label="SFW" /> 
								<FormControlLabel value={false} control={<CustomCssRadio />} label="NSFW" />
							</RadioGroup>
						</FormControl>
					</li>
					<li>
						<div onClick={handleStartClick}>
							<CustomCssButton text="Start" width="15vw" height="8vh" fontSize="1.5vw" /> {/* disable button and radios when user is not host */}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

