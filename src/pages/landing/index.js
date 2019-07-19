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
            <Card className="selection-card">
              <Card.Img 
                className="selection-card-img"
                variant="top" 
                src={require("./res/snake.png")} />
              <Card.Body>
                <Card.Title>Snake</Card.Title>
                <Button
                  onClick={() => this.changePage('snake')}
                  variant="primary">
                  Play
                </Button>
              </Card.Body>
            </Card>
            <Card className="selection-card">
              <Card.Img
                className="selection-card-img"
                variant="top"
                src={require("./res/connect4.png")} />
              <Card.Body className="selection-card-body">
                <Card.Title>Connect 4</Card.Title>
                <Button
                  onClick={() => this.changePage('connect4')}
                  variant="primary">
                  Play
                </Button>
              </Card.Body> 
            </Card>
            <Card className="selection-card">
              <Card.Img
                className="selection-card-img"
                variant="top"
                src={require("./res/connect4.png")} />
              <Card.Body className="selection-card-body">
                <Card.Title>Tetris</Card.Title>
                <Button
                  onClick={() => this.changePage('tetris')}
                  variant="primary">
                  Play
                </Button>
              </Card.Body> 
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
