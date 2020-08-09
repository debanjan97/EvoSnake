import React, {useState, useContext} from 'react';
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
import EvoContext from '../../core-utils/ContextAPI/context';

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
    } = props;

    const context = useContext(EvoContext)
    const [newUsername, setNewUsername] = useState(null)

    const submitPlayer = () => {
        savePlayer(newUsername || context.player.username).then(()=>{
            saveSnake(newUsername || context.player.username, {
                'score': context.score,
                'no_of_moves': context.moves,
                'duration': context.duration
            }).then(() => {
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
                        defaultValue={context.player.username}
                        helperText="Enter your name"
                        variant="outlined"
                        onChange={event => setNewUsername(event.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Score"
                        defaultValue={context.score}
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