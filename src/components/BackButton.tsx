import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from "react-router-dom"

export default function BackButton() {
	var history = useHistory
    return (
        <div className="backButton" onClick={history.goBack()}>
			<Link >
				<ArrowBackIosIcon /> Back
			</Link>
        </div>
    );
}

