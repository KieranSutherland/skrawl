import React from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import BackButton from '../BackButton'
import { Link } from "react-router-dom"
import 'firebase/firestore';

export default function PrivateLobby() {
	return (
		<div className="lobbySetup">
			<BackButton />
			<ul>
				<li style={{ boxShadow: 'none' }}>
					<Link to="private-lobby-join" style={{ textDecoration: 'none' }}>
						<CustomCssButton text="Join" width="20vw" height="8vh" fontSize="1.5vw" />
					</Link>
				</li>
				<li>
					<Link to="private-lobby-create" style={{ textDecoration: 'none' }}>
						<CustomCssButton text="Create" width="20vw" height="8vh" fontSize="1.5vw" />
					</Link>
				</li>
			</ul>
		</div>
	);
}

