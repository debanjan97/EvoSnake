import React from 'react';
import {
    Dialog,
    Button,
    DialogActions,
    DialogTitle
} from '@material-ui/core';
import {
    GAME_ENDED_TITLE,
    REPLAY,
    HOME
} from '../Constants';

const propTypes = {
};

const defaultProps = {
    isEnded: false
};

const GameEndedDialog = (props) => {
    const {
        isEnded,
        replayGame,
        goToHome
    } = props;

    return (
        <Dialog open={isEnded}>
            <DialogTitle>{GAME_ENDED_TITLE}</DialogTitle>
            <DialogActions>
                <Button onClick={replayGame} color="primary" autoFocus>
                    {REPLAY}
                </Button>
                <Button onClick={goToHome} color="primary">
                    {HOME}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

GameEndedDialog.propTypes = propTypes;

GameEndedDialog.defaultProps = defaultProps;

export default GameEndedDialog;