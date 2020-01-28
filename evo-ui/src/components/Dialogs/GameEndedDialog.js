import React from 'react';
import {
    Dialog,
    Button,
    DialogActions,
    DialogTitle,
    TextField,
    Box,
    DialogContent
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
        <Dialog open={isEnded} fullWidth={"md"}>
            <DialogTitle>{GAME_ENDED_TITLE}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="row">
                    <TextField
                        label="Player Name"
                        defaultValue={"Eyepatch" || "Default Value"}
                        helperText="Enter your name"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Score"
                        defaultValue={props.score || 100}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </Box>
                <DialogActions>
                    <Button onClick={replayGame} color="primary" autoFocus>
                        {REPLAY}
                    </Button>
                    <Button onClick={goToHome} color="primary">
                        {HOME}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

GameEndedDialog.propTypes = propTypes;

GameEndedDialog.defaultProps = defaultProps;

export default GameEndedDialog;