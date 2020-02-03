import React, { useEffect, useState } from "react";
import snake from "../../assets/images/flat_snake.svg"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { PlayCircleOutline, AndroidOutlined } from '@material-ui/icons';
import {
    Link
} from "react-router-dom";
import {fetchMostRecentPlayer} from '../../core-utils/ApiCalls'
import {WELCOME_MESSAGE} from '../Constants'

const useStyles = makeStyles(theme => ({
    snake: {
        height: "40vw",
        width: "auto",
        padding: '0 30px',
    },
    root: {
    },
    grid: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    icons: {
        marginLeft: "8px"
    },
    buttons: {
        border: "3px solid black",
        background: "#5CC253",
    },
    link: {
        textDecoration: "none"
    }
}));

function LandingPage(props) {
    const classes = useStyles();

    let {username, setUsername} = props

    useEffect(() => {
        fetchMostRecentPlayer().then(player => {
            setTimeout(()=>{
                setUsername(player.username)
            }, 1000)
        })
    }, [username])
    return (<div className="landing-page">
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <img src={snake} className={classes.snake}></img>
            <div style={{
                position: "absolute",
                bottom: '300px',
                fontSize: '24px',
                fontWeight: '100'
            }}>
                {username && `${WELCOME_MESSAGE} ${username} !!` || <CircularProgress color="black"/>}
            </div>
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={3}>
                <Link to="/play" className={classes.link}>
                    <Button variant="outlined" className={classes.buttons} size="large" endIcon={<PlayCircleOutline className={classes.icons} />}>
                        Play
                        </Button>
                </Link>
            </Grid>
            <Grid item xs={3}>
                <Link to="/bot" className={classes.link}>
                    <Button variant="outlined" className={classes.buttons} size="large" endIcon={<AndroidOutlined className={classes.icons} />}>
                        Bot
                    </Button>
                </Link>
            </Grid>
        </Grid>
    </div>)
}
export default LandingPage;