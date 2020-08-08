import React, {useState} from 'react';
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
    SAVE
} from '../Constants';
import {savePlayer, saveSnake} from "../../core-utils/ApiCalls"

const propTypes = {
};

const defaultProps = {
    isEnded: false
};

const GameEndedDialog = (props) => {
    const {
        isEnded,
        replayGame,
        goToHome,
        score,
        username
    } = props;

    const [newUsername, setNewUsername] = useState(null)

    const submitPlayer = () => {
        savePlayer(newUsername || username).then(()=>{
            saveSnake(newUsername || username, score).then(() => {
                goToHome()
            })
        })
    }

    return (
        <Dialog open={isEnded} fullWidth={"md"}>
            <DialogTitle>{GAME_ENDED_TITLE}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="row">
                    <TextField
                        label="Player Name"
                        defaultValue={props.username}
                        helperText="Enter your name"
                        variant="outlined"
                        onChange={event => setNewUsername(event.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Score"
                        defaultValue={score}
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
                    <Button onClick={submitPlayer} color="primary">
                        {SAVE}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

GameEndedDialog.propTypes = propTypes;

GameEndedDialog.defaultProps = defaultProps;

export default GameEndedDialog;