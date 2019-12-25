import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import theme from './core-utils/themes'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <LandingPage />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
