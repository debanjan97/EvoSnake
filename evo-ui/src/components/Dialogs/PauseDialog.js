import React from 'react';
import {
    Dialog,
    DialogActions,
    Button,
    DialogTitle
} from '@material-ui/core';
import propTypes from 'prop-types';

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
            <DialogTitle id="alert-dialog-title">{"Game paused.Do you want to resume?"}</DialogTitle>
            <DialogActions>
                <Button onClick={replayGame} color="primary">
                    Replay
                </Button>
                <Button onClick={resumeGame} color="primary" autoFocus>
                    Resume
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PauseDialog.propTypes = Types;

PauseDialog.defaultProps = defaultProps;

export default PauseDialog;