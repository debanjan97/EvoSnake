import React, { useState } from 'react';
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
  let [username, setUsername] = useState(null)

  const updateUsername = newUsername => {
    setUsername(newUsername)
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage username={username} setUsername={updateUsername} />
            </Route>
            <Route path="/play">
              <GameScreen username={username} />
            </Route>
            <Route path="/bot" component={BotScreen} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
