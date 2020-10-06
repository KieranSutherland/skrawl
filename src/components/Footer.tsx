import React from 'react'
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <div className="footer">
            Footer
			<Link to="/">Home</Link>
			<Link to="/game">Game</Link>
        </div>
    );
}

