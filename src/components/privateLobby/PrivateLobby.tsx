import React from 'react'
import CustomCssButton from '../mui/CustomCssButton'
import BackButton from '../BackButton'
import { Link } from "react-router-dom"
import 'firebase/firestore';

export default function PrivateLobby() {
	return (
		<div className="lobbySetup">
			<BackButton />
			<form>
				<ul>
					<li style={{ boxShadow: 'none' }}>
						<Link to="private-lobby-join" style={{ textDecoration: 'none' }}>
							<CustomCssButton text="Join" width="100%" height="8vh" fontSize="3vh" />
						</Link>
					</li>
					<li>
						<Link to="private-lobby-create" style={{ textDecoration: 'none', width: '100%' }}>
							<CustomCssButton text="Create" width="100%" height="8vh" fontSize="3vh" />
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
}

