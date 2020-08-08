import React, { useContext } from 'react';
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
import EvoProvider from './core-utils/ContextAPI/provider';
import EvoContext from './core-utils/ContextAPI/context';

function App() {
  const context = useContext(EvoContext)
  return (
    <MuiThemeProvider theme={theme}>
      <EvoProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/">
                <LandingPage/>
              </Route>
              <Route path="/play">
                <GameScreen />
              </Route>
              <Route path="/bot" component={BotScreen} />
            </Switch>
          </Router>
        </div>
      </EvoProvider>
    </MuiThemeProvider>
  );
}

export default App;
