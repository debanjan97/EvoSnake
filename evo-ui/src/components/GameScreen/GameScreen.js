import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GameBoard from './GameBoard'
import Grid from '@material-ui/core/Grid';
import GameScoreView from './GameScoreView/GameScoreView' 

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
    const [score, setScore] = useState(3)
    const [isClickedOutside, setIsClickedOutside] = useState(false)
    const handleScore = score => {
        setScore(score)
    }
    const handleClick = () => {
        setIsClickedOutside(true)
    }
    const resetClick = () => {
        setIsClickedOutside(false)
    }
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
          <GameScoreView type='snake'/>
          <GameBoard
            setScore={handleScore}
            isClicked={isClickedOutside}
            resetClick={resetClick}
            score={score}
            username={props.username}
          />
          <GameScoreView type='player'/>
        </Grid>
      </React.Fragment>
    );
}

export default GameScreen;