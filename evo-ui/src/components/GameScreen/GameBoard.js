import React, { useState, useRef, useEffect } from "react";
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Snake from "../GameElements/Snake";
import Food from "../GameElements/Food";
import PauseDialog from "../Dialogs/PauseDialog";

const useStyles = makeStyles(theme => ({
  canvas: {
    height: "50vh",
    width: "50vw",
    backgroundColor: "#222222",
    border: "5px dashed brown",
    position: "relative",
    margin: "0 auto"
  }
}))

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y]
}

const GameBoard = (props) => {
  const classes = useStyles();
  const [food, setFood] = useState(getRandomCoordinates())
  const [speed, setSpeed] = useState(100)
  const [direction, setDirection] = useState('RIGHT')
  const [isPaused, setIsPaused] = useState(false);
  const [snakeBod, setSnakeBod] = useState([
    [0, 10],
    [2, 10],
    [4, 10]
  ])

  const moveSnake = () => {
    let bod = [...snakeBod]
    let head = bod[bod.length - 1]
    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break;
      case 'UP':
        head = [head[0], head[1] - 2]
        break;
    }
    bod.push(head)
    if (!checkIfEat(head)) {
      bod.shift()
    }
    else {
      // if food is there, update the score
      props.setScore(bod.length)
    }
    setSnakeBod(bod)
  }

  const onGameOver = () => {
    if (window.confirm("Game Over")) {
      window.location.reload();
    }
    else {
      window.location.replace("/");
    }
  }

  function onKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        if (direction != 'DOWN')
          setDirection('UP');
        break;
      case 40:
        if (direction != 'UP')
          setDirection('DOWN');
        break;
      case 37:
        if (direction != 'RIGHT')
          setDirection('LEFT');
        break;
      case 39:
        if (direction != 'LEFT')
          setDirection('RIGHT');
        break;
      case 32:
        setIsPaused(!isPaused);
        break;
    }
  }
  const checkIfOutOfBorder = () => {
    let bod = [...snakeBod]
    let head = bod[bod.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  const resumeGame = () => {
    props.resetClick();
    setIsPaused(false);
  }

  const replayGame = () => {
    window.location.reload();
  }

  const checkIfCollapsed = () => {
    let bod = [...snakeBod]
    let head = bod[bod.length - 1]
    bod.pop()
    bod.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        onGameOver();
      }
    })
  }

  const checkIfEat = (head) => {
    // takes head as input, checks for food condition
    if (head[0] == food[0] && head[1] == food[1]) {
      setFood(getRandomCoordinates())
      increaseSpeed();
      return true
    }
    return false
  }

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 2)
    }
  }

  const playGame = () => {
    moveSnake();
    checkIfOutOfBorder();
    checkIfCollapsed();
  }

  const handleClick = (event) => {
    event.stopPropagation();
  }

  useEffect(() => {
    document.getElementById("evo-board").focus()
    if (!isPaused && !props.isClicked) {
      setTimeout(playGame, speed);
    }
  }, [snakeBod, isPaused, props.isClicked])

  return (
    <CardContent>
      <div className={classes.canvas} onKeyDown={onKeyDown} tabIndex={0} id="evo-board" onClick={handleClick}>
        <Snake snakeBod={snakeBod} />
        <Food food={food} />
        <PauseDialog
          isPaused={isPaused || props.isClicked}
          replayGame={replayGame}
          resumeGame={resumeGame}
        />
      </div>
    </CardContent>)
}

export default GameBoard;