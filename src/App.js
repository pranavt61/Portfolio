import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

// pages
import LandingPage from './pages/landing/';
import SnakePage from './pages/snake/';
import Connect4Page from './pages/connect4/';
import TertisPage from './pages/tetris/';

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/snake" component={SnakePage} />
            <Route path="/connect4" component={Connect4Page} />
            <Route path="/tetris" component={TertisPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
