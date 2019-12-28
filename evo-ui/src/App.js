import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import theme from './core-utils/themes';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import GameScreen from './components/GameScreen/GameScreen'
import BotScreen from './components/BotScreen/BotScreen';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/play">
                <GameScreen playerName="Eyepatch"/>
              </Route>
            <Route path="/bot" component={BotScreen} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
