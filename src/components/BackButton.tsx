import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom"
import { accentColor } from '../constants'

export default function BackButton() {
	var history = useHistory()
    return (
        <div className="backButton" onClick={() => history.goBack()}>
				<ArrowBackIosIcon style={{fill: accentColor}} />
				<div>
					Back
				</div>
        </div>
    );
}

