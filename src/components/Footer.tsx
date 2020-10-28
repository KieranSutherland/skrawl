import React from 'react'
import { Link } from "react-router-dom"

export default function Footer() {
	return (
		<div className="footer">
			<ul>
				<li>
					<Link to="terms-and-conditions">Terms & Conditions</Link>
				</li>
				<li>
					<Link to="privacy">Privacy</Link>
				</li>
			</ul>
		</div>
	);
}

