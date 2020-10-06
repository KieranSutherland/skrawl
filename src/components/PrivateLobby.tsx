import React from 'react'
import CustomCssButton from './mui/CustomCssButton'
import { Link } from "react-router-dom"

export default function PrivateLobby() {
    return (
        <div className="lobbySetup">
			<ul>
					<li>
						<Link to="/game" style={{ textDecoration: 'none' }}>
							<CustomCssButton text="Join" width="15vw" height="8vh" fontSize="1.5vw" />
						</Link>
					</li>
					<li>
						<Link to="/private-lobby-creator" style={{ textDecoration: 'none' }}>
							<CustomCssButton text="Create" width="15vw" height="8vh" fontSize="1.5vw" />
						</Link>
					</li>
				</ul>
        </div>
    );
}

