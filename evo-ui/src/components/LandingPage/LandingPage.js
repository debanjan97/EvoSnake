import React, { useEffect, useContext } from "react";
import snake from "../../assets/images/flat_snake.svg"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { PlayCircleOutline, AndroidOutlined } from '@material-ui/icons';
import {
    Link
} from "react-router-dom";
import {fetchMostRecentPlayer} from '../../core-utils/ApiCalls'
import {WELCOME_MESSAGE} from '../Constants'
import EvoContext from '../../core-utils/ContextAPI/context'

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
        border: `2px solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.text2
    },
    link: {
        textDecoration: "none"
    },
    landingPage: {
        backgroundColor: theme.palette.primary.main
    },
    welcomeText: {
        position: "absolute",
        bottom: '300px',
        fontSize: '24px',
        fontWeight: '100',
        color: theme.palette.primary.text1
    },
    progressCircle: {
        color: theme.palette.primary.text2
    }
}));

function LandingPage(props) {
    const classes = useStyles();
    const context = useContext(EvoContext)
    let username = context.player.username

    useEffect(() => {
        fetchMostRecentPlayer().then(player => {
            setTimeout(()=>{
                context.updatePlayer(player)
            }, 1000)
        })
    }, [username])
    return (<div className={"landing-page "+classes.landingPage}>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <img src={snake} className={classes.snake}></img>
            <div className={classes.welcomeText}>
                {username && `${WELCOME_MESSAGE} ${username} !!` || <CircularProgress className={classes.progressCircle}/>}
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