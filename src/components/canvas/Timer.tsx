import React, { useState, useEffect } from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles'
import { accentColor } from '../../constants'

const CustomCssCircularProgress = withStyles({
	colorPrimary: {
        color: accentColor
      },
  })(CircularProgress);

export default function Timer() {
	const [progress, setProgress] = useState(0);
	const tickDelay = 2 // seconds
	const timerDuration = 60 // seconds

	useEffect(() => {
		const timer = setInterval(() => {
		setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 2));
		}, timerDuration * tickDelay * 10);

		return () => {
		clearInterval(timer);
		};
	}, []);
	return (
		<div className="timer">
			Time left:
			<CustomCssCircularProgress variant="static" value={progress} />
		</div>
	)
}
