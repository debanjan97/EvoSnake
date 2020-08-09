import React, { useState, useEffect, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GameBoard from './GameBoard'
import Grid from '@material-ui/core/Grid';
import GameScoreView from './GameScoreView/GameScoreView'
import moment from "moment"
import EvoContext from '../../core-utils/ContextAPI/context';
import {
  getPlayerHighScore,
  getTotalHighScore,
  getPlayerAverageScore,
} from "../../core-utils/ApiCalls";

const useStyles = makeStyles({
    board: {
        height: "100vh",
        width: "100vw",
        backgroundColor: `#263238`,
        position: "relative",
        flexGrow: 1,
        padding: '0 100px'
    },
    scorecard: {
        border: "2px solid black",
        padding: "8px",
        boxSizing: "border-box"
    }
})

function GameScreen(props) {
    const classes = useStyles()
    const [isClickedOutside, setIsClickedOutside] = useState(false)
    const [startTime, _] = useState(moment.now())

    /**
     * Timer state can have 2 states
     * running
     * stooped
     */
    const [timerState, setTimerState] = useState("running")
    const timerStateRef = useRef(timerState)
    const [playerHighScore, setPlayerHighScore] = useState(0)
    const [totalHighScore, setTotalHighScore] = useState(0)
    const [playerAvgHighScore, setPlayerAvgHighScore] = useState(0)

    timerStateRef.current = timerState

    const context = useContext(EvoContext)

    const handleScore = score => {
        context.updateScore(score)
    }
    const handleClick = () => {
        setIsClickedOutside(true)
    }
    const resetClick = () => {
        setIsClickedOutside(false)
    }
    const updateNumberOfMoves = () => {
      context.updateMoves(context.moves+1)
    }
    const runTimer = () => {
      if (timerStateRef.current == "running") {
        let duration = moment().diff(startTime);
        context.setDuration(duration);
      }
    }
    const stopTimer = () => {
      setTimerState("stopped")
    }
    useEffect(()=>{
      setInterval(runTimer, 1000)
        
      // fetch player highscore
      getPlayerHighScore(context.player.id).then(data => {
        setPlayerHighScore(data)
      })

      getTotalHighScore().then(data => {
        setTotalHighScore(data)
      })
      
      getPlayerAverageScore(context.player.id).then(data => {
        setPlayerAvgHighScore(data)
      })
      
    }, [])
    return (
      <React.Fragment>
        <Grid
          container
          direction="rows"
          justify="space-between"
          alignItems="center"
          className={classes.board}
          onClick={handleClick}
        >
          <GameScoreView
            type="snake"
            score={context.score}
            moves={context.moves}
            duration={moment.utc(context.duration).format("mm:ss") + " sec"}
          />
          <GameBoard
            setScore={handleScore}
            isClicked={isClickedOutside}
            resetClick={resetClick}
            updateNumberOfMoves={updateNumberOfMoves}
            stopTimer={stopTimer}
            score={context.score}
            ign={context.player.username}
          />
          <GameScoreView
            type="player"
            ign={context.player.username}
            player_avg_score={playerAvgHighScore}
            player_highscore={playerHighScore}
            total_highscore={totalHighScore}
          />
        </Grid>
      </React.Fragment>
    );
}

export default GameScreen;