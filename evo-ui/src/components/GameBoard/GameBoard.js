import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme=>({
    board:{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f8f8f8"
    },
    canvas: {
        height: "50vh",
        width: "50vw",
        marginTop: "120px",
        backgroundColor: "green",
        border: "5px dashed brown"
    }
}))

function GameBoard() {
    const classes = useStyles()
    return(<Card className={classes.board}>
        <CardContent><canvas className={classes.canvas}/></CardContent>
    </Card>)
}

export default GameBoard;