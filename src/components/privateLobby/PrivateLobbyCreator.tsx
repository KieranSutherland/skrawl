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
import scenarios from '../../scenarios.json'
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import * as firebaseHelper from '../../utils/firebaseHelper'
import * as gameHelper from '../../utils/gameHelper'
import { accentColor, minPlayers, maxPlayers } from '../../constants'

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
	const [sfw, setSfw] = useState<boolean | undefined>(undefined)
	const [roomCode, setRoomCode] = useState<string>('????')
	const [password, setPassword] = useState<string>('????????')
	const [players, setPlayers] = useState<FirebaseLobbyPlayersField>([])
	const [hostUid, setHostUid] = useState<string>('')
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

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
			setPassword(doc!.get('password'))
			setPlayers(doc!.get('players'))
			setHostUid(doc!.get('host'))
			setSfw(doc!.get('sfw'))
			setRoomCode(doc!.id)
			if (doc!.get('started') as boolean) {
				unsubscribeSnapshotListener()
				history.push('/game')
			}
		})

		// console.log('final currentLobby: ' + JSON.stringify(currentLobby, getCircularReplacer()))
	}

	const handleScenarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newBool: boolean = (event.target as HTMLInputElement).value === 'true'
		if (sfw === newBool) {
			return
		}
		firestore.collection('lobbies').doc(roomCode).update({
			sfw: newBool
		})
	}

	const handleStartClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault()
		if (players.length < minPlayers) {
			alert(`You need ${minPlayers} or more players to start a game`)
			return
		} else if (players.length > maxPlayers) {
			alert(`You need less than ${maxPlayers} players to start a game`)
			return
		}
		players.forEach(player => player.points = 0)
		const scenariosList = await gameHelper.generateScenarioList(sfw, players)
		// console.log('players: ' + players)
		// console.log('maxRound: ' + players.length)
		// console.log('scenarios: ' + scenariosList)
		await firestore.collection('lobbies').doc(roomCode).update({
			players: players,
			started: true,
			maxRound: players.length,
			scenarios: scenariosList
		})
	}
	
	return (
		roomCode === '????' ? <div className="lobbySetup"><Loading /></div> :
		<div className="lobbySetup">
			<BackButton cleanLobbies={true} />
			<div className="privateLobbyPlayerList">
				<Players players={players} currentUserUid={currentUser ? currentUser.uid : ''} hostUid={hostUid} />
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
								<div>
									<CustomCssButton text="Start" width="100%" height="8vh" fontSize="3vh" onClick={handleStartClick} />
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

