import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Card,
  Button
} from 'react-bootstrap';

import './style.css';

class App extends React.Component {

  changePage = (path) => {
    this.props.history.push(path);
  };

  redirectPage = (path) => {
    window.location.href = path;
  };
  
  render() {
    return (
      <div className="main-view">
        <div className="landing">
          <h1 className="landing-text">
            Stay <strong>Hungry.</strong> Stay <strong>Foolish.</strong>
          </h1>
        </div>
        <div className="portfolio">
          <div className="selection">
            <Card className="selection-card text-white bg-secondary">
              <Card.Img 
                className="selection-card-img"
                variant="top" 
                src={require("./res/snake.png")} />
              <Card.Body>
                <Card.Title>Snake</Card.Title>
                <div className="selection-card-buttons">
                  <Button
                    onClick={() => this.changePage('snake')}
                    variant="success">
                    Play
                  </Button>
                  <Button
                    onClick={() => this.redirectPage('https://github.com/pranavt61/Portfolio/tree/master/src/pages/snake')}
                    variant="secondary">
                    Source
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Card className="selection-card text-white bg-secondary">
              <Card.Img
                className="selection-card-img"
                variant="top"
                src={require("./res/connect4.png")} />
              <Card.Body className="selection-card-body">
                <Card.Title>Connect 4</Card.Title>
                <div className="selection-card-buttons">
                  <Button
                    onClick={() => this.changePage('connect4')}
                    variant="success">
                    Play
                  </Button>
                  <Button
                    onClick={() => this.redirectPage('https://github.com/pranavt61/Portfolio/tree/master/src/pages/connect4')}
                    variant="secondary">
                    Source
                  </Button>
                </div>
              </Card.Body> 
            </Card>
            <Card className="selection-card text-white bg-secondary">
              <Card.Img
                className="selection-card-img"
                variant="top"
                src={require("./res/tetris.png")} />
              <Card.Body className="selection-card-body">
                <Card.Title>Tetris</Card.Title>
                <div className="selection-card-buttons">
                  <Button
                    onClick={() => this.changePage('tetris')}
                    variant="success">
                    Play
                  </Button>
                  <Button
                    onClick={() => this.redirectPage('https://github.com/pranavt61/Portfolio/tree/master/src/pages/tetris')}
                    variant="secondary">
                    Source
                  </Button>
                </div>
              </Card.Body> 
            </Card>
            <Card className="selection-card text-white bg-secondary">
              <Card.Img
                className="selection-card-img"
                variant="top"
                src={require("./res/minesweeper.png")} />
              <Card.Body className="selection-card-body">
                <Card.Title>MineSweeper</Card.Title>
                <div className="selection-card-buttons">
                  <Button
                    onClick={() => this.changePage('minesweeper')}
                    variant="success">
                    Play
                  </Button>
                  <Button
                    onClick={() => this.redirectPage('https://github.com/pranavt61/Portfolio/tree/master/src/pages/minesweeper')}
                    variant="secondary">
                    Source
                  </Button>
                </div>
              </Card.Body> 
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
