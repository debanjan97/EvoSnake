import React from "react";
import snake from "../../assets/images/flat_snake.svg"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { PlayCircleOutline, AndroidOutlined } from '@material-ui/icons';
import {
    Link
} from "react-router-dom";

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

function LandingPage() {
    const classes = useStyles();
    return (<div className="landing-page">
        <img src={snake} className={classes.snake}></img>
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