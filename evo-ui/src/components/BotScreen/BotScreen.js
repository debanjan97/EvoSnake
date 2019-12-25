import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    board: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "green",
        fontSize: 32
    }
}))

function BotScreen() {
    const classes = useStyles()
    return (<div className={classes.board}>
        Coming Soon
    </div>)
}

export default BotScreen;
