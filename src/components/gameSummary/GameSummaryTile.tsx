import React, { useRef, useEffect, useState } from "react"
import CanvasDraw from "react-canvas-draw"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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
	const classes = useStyles();
	const paperRef = useRef<HTMLDivElement | null>(null)
	const [paperSize, setPaperSize] = useState<number>(200)
	const isGuess = props.attempt.phase === 'guess'

	useEffect(() => {
		if (paperRef.current?.offsetWidth && paperRef.current?.offsetWidth !== paperSize) {
			setPaperSize(paperRef.current?.offsetWidth)
		}
	}, [paperRef])

	return (
		<Grid key={props.attemptNo} item xs={3}>
			<div>
				<Paper 
					className={props.isVotingUser && props.attemptNo !== 1 ? classes.paperVoting : classes.paperDefault} 
					style={props.selectedWinnerIndex === props.attemptNo ? {borderRadius: '9px', boxShadow: `inset 0px 0px 0px 4px ${accentColor}`} : {}}
					onClick={e => props.isVotingUser && props.attemptNo !== 1 ? props.handleTileClickFunction(e, props.attemptNo) : null}>
					<div className="tileRoundCount">
						{props.attemptNo}
					</div>
					<div ref={paperRef} style={{ height: paperSize, display: "flex", alignItems: 'center', justifyContent: "center" }}>
						{
							isGuess ?
								props.attempt.attempt
							:
								<CanvasDraw
									catenaryColor={"#0a0302"}
									gridColor={"rgba(150,150,150,0.17)"}
									canvasWidth={paperSize - 8}
									canvasHeight={paperSize - 8}
									disabled={true}
									saveData={props.attempt.attempt}
									immediateLoading={true}
									hideGrid={true}
									hideInterface={true}
								/>
						}
					</div>
				</Paper>
				<div className="gameSummaryInnerAttemptTitle">
					<h2>{props.attempt.attemptByDisplayName}'s {isGuess ? 'guess' : 'drawing'}</h2>
				</div>
			</div>
		</Grid>
	)
}
