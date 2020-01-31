import React from 'react';
import {
    Dialog,
    DialogActions,
    Button,
    DialogTitle
} from '@material-ui/core';
import propTypes from 'prop-types';
import {
    REPLAY,
    RESUME,
    GAME_PAUSED_TITLE
} from '../Constants';

const Types = {
    isPaused: propTypes.bool,
    resumeGame: propTypes.func,
    replayGame: propTypes.func
};

const defaultProps = {
    isPaused: false,
};

const PauseDialog = (props) => {
    const {
        isPaused,
        resumeGame,
        replayGame
    } = props;

    return (
        <Dialog
            open={isPaused}
        >
            <DialogTitle id="alert-dialog-title">{GAME_PAUSED_TITLE}</DialogTitle>
            <DialogActions>
                <Button onClick={replayGame} color="primary">
                    {REPLAY}
                </Button>
                <Button onClick={resumeGame} color="primary" autoFocus>
                    {RESUME}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PauseDialog.propTypes = Types;

PauseDialog.defaultProps = defaultProps;

export default PauseDialog;