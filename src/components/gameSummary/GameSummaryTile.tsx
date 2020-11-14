import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import CanvasDraw from "react-canvas-draw"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TileRoundCount from './TileRoundCount'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		guessPaper: {
			fontSize: '1vw',
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.primary,
			position: 'relative'
		},
		drawingPaper: {
			padding: theme.spacing(0.2),
			position: 'relative'
		},
	}),
)

export default function GameSummaryTile(props: any) {
	const classes = useStyles();
	const paperRef = useRef<HTMLDivElement | null>(null)
	const [paperSize, setPaperSize] = useState<number>(200)
	const history = useHistory()

	useEffect(() => {
		if (paperRef.current?.offsetWidth && paperRef.current?.offsetWidth !== paperSize) {
			setPaperSize(paperRef.current?.offsetWidth)
		}
	}, [paperRef])

	useLayoutEffect(() => {
		const updateSize = () => {
			history.go(0)
		}
		window.addEventListener('resize', updateSize)
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	if (props.attempt.phase === 'guess') {
		return (
			<Grid key={props.index} item xs={3}>
				<div>
					<Paper className={classes.guessPaper}>
						<TileRoundCount count={props.index + 1} />
						<div ref={paperRef} style={{ height: paperSize, display: "flex", flexDirection: "column", justifyContent: "center" }}>
							{props.attempt.attempt}
						</div>
					</Paper>
					<div className="gameSummaryInnerAttemptTitle">
						{
							props.index === 0 ?
								<h2>Original Scenario</h2>
								:
								<h2>{props.attempt.attemptByDisplayName}'s guess</h2>
						}
					</div>
				</div>
			</Grid>
		)
	} else {
		return (
			<Grid key={props.index} item xs={3}>
				<div>
					<Paper className={classes.drawingPaper}>
						<TileRoundCount count={props.index + 1} />
						<div ref={paperRef}>
							<CanvasDraw
								className="canvasDraw"
								catenaryColor={"#0a0302"}
								gridColor={"rgba(150,150,150,0.17)"}
								canvasWidth={paperSize}
								canvasHeight={paperSize}
								disabled={true}
								saveData={props.attempt.attempt}
								immediateLoading={true}
								hideGrid={true}
								hideInterface={true}
							/>
						</div>
					</Paper>
					<div className="gameSummaryInnerAttemptTitle">
						<h2>{props.attempt.attemptByDisplayName}'s drawing</h2>
					</div>
				</div>
			</Grid>
		)
	}
}
