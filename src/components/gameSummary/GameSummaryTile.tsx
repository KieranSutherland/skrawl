import React, { useRef, useEffect, useState } from "react"
import CanvasDraw from "react-canvas-draw"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import fullScreenIcon from '../../resources/full_screen.png'
import GameSummaryTileCanvas from './GameSummaryTileCanvas'
import { accentColor } from '../../constants'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paperDefault: {
			fontSize: '1vw',
			padding: theme.spacing(2),
			position: 'relative',
			borderRadius: '6px',
		},
		paperVoting: {
			fontSize: '1vw',
			padding: theme.spacing(2),
			position: 'relative',
			borderRadius: '6px',
			'&:hover': {
				borderRadius: '9px',
				boxShadow: `inset 0px 0px 0px 4px ${accentColor}`,
				cursor: 'pointer'
			}
		},
		paperSelected: {
			borderRadius: '9px',
			boxShadow: `inset 0px 0px 0px 4px ${accentColor}`,
		}
	}),
)

export default function GameSummaryTile(props: any) {
	const classes = useStyles()
	const paperInnerRef = useRef<HTMLDivElement | null>(null)
	const [paperSize, setPaperSize] = useState<number>(200)
	const [showFullScreenIcon, setShowFullScreenIcon] = useState<boolean>(false)
	const [showFullScreenCanvas, setShowFullScreenCanvas] = useState<boolean>(false)
	const isGuess = props.attempt.phase === 'guess'

	useEffect(() => {
		if (paperInnerRef.current?.offsetWidth && paperInnerRef.current?.offsetWidth !== paperSize) {
			setPaperSize(paperInnerRef.current?.offsetWidth)
		}
	}, [paperInnerRef])

	return (
		<Grid className="gameSummaryTile" key={props.attemptNo} item xs={3}>
			<div onMouseOver={e => setShowFullScreenIcon(!isGuess)} onMouseLeave={e => setShowFullScreenIcon(false)}>
				<div className="gameSummaryInnerAttemptTitle">
					<h3 style={{margin: '0 0 3px 0', color: '#999999'}}>{isGuess ? 'Guess' : 'Drawing'}</h3>
				</div>
				<Paper 
					className={props.isVotingUser && props.attemptNo !== 1 ? classes.paperVoting : classes.paperDefault} 
					style={props.selectedWinnerIndex === props.attemptNo ? {borderRadius: '9px', boxShadow: `inset 0px 0px 0px 4px ${accentColor}`} : {}}
					onClick={e => props.isVotingUser && props.attemptNo !== 1 ? props.handleTileClickFunction(e, props.attemptNo) : null}>
					<div className="tileRoundCount">
						{props.attemptNo}
					</div>
					<div className="tileFullScreen" hidden={!showFullScreenIcon}>
						<img className="tileFullScreenImg" src={fullScreenIcon} alt="Full screen" onClick={() => setShowFullScreenCanvas(true)} />
					</div>
					<div ref={paperInnerRef} style={{ height: paperSize, display: "flex", alignItems: 'center', justifyContent: "center" }}>
						{
							isGuess ?
								props.attempt.attempt
							:
								<GameSummaryTileCanvas 
									size={paperSize - 8}
									drawing={props.attempt.attempt} />
						}
					</div>
				</Paper>
				<div className="gameSummaryInnerAttemptTitle">
					<h2>{props.attempt.attemptByDisplayName}</h2>
				</div>
			</div>
			<Dialog
				maxWidth={false}
				open={showFullScreenCanvas}
				onClick={() => setShowFullScreenCanvas(false)}>
				<GameSummaryTileCanvas 
					size={paperSize * 4}
					drawing={props.attempt.attempt} />
			</Dialog>
		</Grid>
	)
}
