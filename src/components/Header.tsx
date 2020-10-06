import React from "react";
import { useHistory, useLocation } from "react-router-dom"

export default function Header() {

	const location = useLocation()
	const history = useHistory()

	const clickHeader = () => {
		if(location.pathname === "/game" && !window.confirm("Are you sure you want to quit your current game?")) {
			return
		}
		history.push("/")
	}

    return (
        <header className="header">
			<div className="headerLink" onClick={clickHeader}>
				Skrawl
			</div>
        </header>
    )
}
  