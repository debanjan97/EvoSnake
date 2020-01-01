import React, { useState, useRef, useEffect } from "react";
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Snake from "../GameElements/Snake";
import Food from "../GameElements/Food";

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

const GameBoard = () => {
  const classes = useStyles();

  const [food, setFood] = useState(getRandomCoordinates())
  const [speed, setSpeed] = useState(100)
  const [direction, setDirection] = useState('RIGHT')
  const [snakeBod, setSnakeBod] = useState([
    [10, 10],
    [12, 10],
    [14, 10],
    [16, 10],
    [18, 10],
    [20, 10]
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
    if(!checkIfEat(head)) {
      bod.shift()
    }
    setSnakeBod(bod)
  }

  const onGameOver = () => {
    alert("Game Over")
  }

  function onKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
      case 40:
        setDirection('DOWN');
        break;
      case 37:
        setDirection('LEFT');
        break;
      case 39:
        setDirection('RIGHT');
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
  useEffect(() => {
    document.getElementById("evo-board").focus()
    setTimeout(playGame, speed);
  },[snakeBod])

  return (<CardContent><div className={classes.canvas} onKeyDown={onKeyDown} tabIndex={0} id="evo-board">
    <Snake snakeBod={snakeBod} />
    <Food food={food} />
  </div>
  </CardContent>)
}

export default GameBoard;