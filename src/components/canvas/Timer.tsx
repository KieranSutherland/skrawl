import React from "react"
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { accentColor } from '../../constants'

const CustomCssLinearProgress = withStyles({
	root: {
	  width: '100%',
	  height: '100%',
	  backgroundColor: '#9fd8cd'
	},
	barColorPrimary: {
		backgroundColor: accentColor,
	}
  })(LinearProgress);

export default function Timer() {
	const [progress, setProgress] = React.useState(0);
	const tickDelay = 2 // seconds
	const timerDuration = 10 // seconds

	React.useEffect(() => {
		const timer = setInterval(() => {
		setProgress((oldProgress) => {
			if (oldProgress === 100) {
				return 0;
			}
			return oldProgress + tickDelay;
		});
		}, timerDuration * tickDelay * 10);

		return () => {
		clearInterval(timer);
		};
	}, []);

	return (
		<div className="timer">
			<CustomCssLinearProgress variant="determinate" value={progress} />
		</div>
	)
}
