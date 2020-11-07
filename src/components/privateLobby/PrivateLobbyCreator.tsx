import React, { useState, useEffect } from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import BackButton from '../BackButton'
import Players from '../players/Players'
import Loading from '../Loading'
import { withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
		'&$disabled': {
			color: accentColor
		}
	},
	checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const getCircularReplacer = () => {
	const seen = new WeakSet()
	return (key: any, value: any) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return
			}
			seen.add(value)
		}
		return value
	}
}

export default function PrivateLobbyCreator() {
	const firestore = firebase.firestore() // change to use explicit import at some point
	const history = useHistory()
	const [sfw, setSfw] = useState<boolean>(true)
	const [roomCode, setRoomCode] = useState<string>('????')
	const [password, setPassword] = useState<string>('????????')
	const [players, setPlayers] = useState<FirebaseLobbyPlayersField[]>([])
	const [hostUid, setHostUid] = useState<string>('')
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
	const MIN_PLAYERS: number = 2 // set to 4 for production
	const MAX_PLAYERS: number = 64

	const stopAuthListener = firebase.auth().onAuthStateChanged(user => setCurrentUser(user))
	
	useEffect(() => {
		setupLobbyListener()
	}, [currentUser])

	const setupLobbyListener = async () => {
		if (!currentUser) return
		// Once current user is defined, unsubscribe from auth listener
		stopAuthListener()

		const currentLobby = await firebaseHelper.getCurrentLobbyOfUser(currentUser!, history)
		if (!currentLobby) return

		const unsubscribeSnapshotListener = firestore.collection('lobbies').doc(currentLobby!.id).onSnapshot(doc => {
			setRoomCode(doc!.id)
			setPassword(doc!.get('password'))
			setPlayers(doc!.get('players'))
			setHostUid(doc!.get('host'))
			setSfw(doc!.get('sfw'))
			if (doc!.get('started') as boolean) {
				unsubscribeSnapshotListener()
				history.push('/game')
			}
		})

		// console.log('final currentLobby: ' + JSON.stringify(currentLobby, getCircularReplacer()))
	}

	const handleScenarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newBool: boolean = (event.target as HTMLInputElement).value === 'true'
		firestore.collection('lobbies').doc(roomCode).update({
			sfw: newBool
		})
	}

	const handleStartClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (players.length < MIN_PLAYERS) {
			alert(`You need ${MIN_PLAYERS} or more players to start a game`)
			return
		} else if (players.length > MAX_PLAYERS) {
			alert(`You need less than ${MAX_PLAYERS} players to start a game`)
			return
		}
		firestore.collection('lobbies').doc(roomCode).update({
			started: true,
			maxRound: players.length
		})
	}
	
	return (
		roomCode === '????' ? <div className="lobbySetup"><Loading /></div> :
		<div className="lobbySetup">
			<BackButton cleanLobbies={true} />
			<div className="privateLobbyPlayerList">
				{/* Players: (11/64) */}
				<Players players={players} hostUid={hostUid} />
			</div>
			<div className="privateLobbySettings">
				<ul>
					<li style={{ boxShadow: 'none' }}>
						Room Code
						<h1>{roomCode}</h1>
					</li>
					<li style={{ boxShadow: 'none' }}>
						Password
						<h2>{password}</h2>
					</li>
					<li style={{ boxShadow: 'none' }}>
						Scenario Choices
						<RadioGroup
							row={true}
							aria-label="scenario_choices"
							name="scenario_choices1"
							value={sfw}
							onChange={handleScenarioChange}
							style={{ display: 'flex', justifyContent: 'center' }}>
							<FormControlLabel
								value={true}
								control={<CustomCssRadio disabled={currentUser?.uid !== hostUid} />}
								label="SFW" />
							<FormControlLabel
								style={{marginRight: '0'}}
								value={false}
								control={<CustomCssRadio disabled={currentUser?.uid !== hostUid} />}
								label="NSFW" />
						</RadioGroup>
					</li>
					{
						currentUser?.uid === hostUid ?
							<li>
								<div onClick={handleStartClick}>
									<CustomCssButton text="Start" width="100%" height="8vh" fontSize="3vh" />
								</div>
							</li>
							:
							<li style={{ boxShadow: 'none' }}>
								<div>
									Waiting for host to start...
							</div>
							</li>
					}
				</ul>
			</div>
		</div>
	);
}

