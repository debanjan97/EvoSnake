import ScoreIcon from "@material-ui/icons/LocalAtm";
import MovesIcon from "@material-ui/icons/OpenWith";
import TimeIcon from "@material-ui/icons/QueryBuilder";
import AverageScoreIcon from '@material-ui/icons/Functions';
import HighScoreIcon from "@material-ui/icons/Equalizer";
import TotalHighScoreIcon from "@material-ui/icons/EmojiEvents";

export const GAME_ENDED_TITLE = "GAME OVER !!!";

export const GAME_PAUSED_TITLE = "Game paused. Do you want to resume?";

export const REPLAY = "Replay";

export const HOME = "Home";

export const SAVE = "Save";

export const RESUME = "Resume";

export const WELCOME_MESSAGE = "Welcome Back"

export const SNAKE_SCORECARD = [
    {
        label: 'Score',
        name: 'score',
        icon: ScoreIcon
    },
    {
        label:"Moves",
        name: 'moves',
        icon: MovesIcon
    },
    {
        label: "Duration",
        name: 'duration',
        icon: TimeIcon
    }
]

export const PLAYER_SCORECARD = [
    {
        label: 'Player',
        name: 'ign',
        icon: null
    },
    {
        label: 'Average Score',
        name: 'player_avg_score',
        icon: AverageScoreIcon
    },
    {
        label: 'Player High Score',
        name: 'player_highscore',
        icon: HighScoreIcon
    },
    {
        label: 'Overall High Score',
        name: 'total_highscore',
        icon: TotalHighScoreIcon
    }
]