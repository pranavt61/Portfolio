import React from 'react';

import Column from './column';

import './style.css';
import redTileImage from './res/red-tile.png';
import yellowTileImage from './res/yellow-tile.png';

// Set global consts
window.BOARD_WIDTH = 7;
window.BOARD_HEIGHT = 6;

class Connect4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 0: red, 
      // 1: yellow, 
      turn: 0,
      selectedCol: 0,                      // for the select pointer
      lastColumnClicked: -1,
      lastRowClicked: -1,

      // -1: no winner yet
      // 0: red, 
      // 1: yellow, 
      winner: -1,

      // -1: empty
      // 0: red, 
      // 1: yellow, 
      // 10: red-win, 
      // 11: yellow-win
      board: [] 
    };
  }

  componentWillMount() {
    let board = this.state.board;

    for (let c = 0; c < window.BOARD_WIDTH; c ++) {
      board.push([]);

      for (let r = 0; r < window.BOARD_HEIGHT; r ++) {
        board[c].push(-1);
      }
    }
  }

  componentDidUpdate(oldProps, oldState) {
    let oldC = oldState.lastColumnClicked;
    let oldR = oldState.lastRowClicked;
    let newC = this.state.lastColumnClicked;
    let newR = this.state.lastRowClicked;

    if (oldC !== newC || oldR !== newR) {
      this.checkBoard(newC, newR);
    }
  }

  // check board for winner
  // triggered in componentDidUpdate()
  // only check from newest tile placed
  checkBoard(newC, newR) {
    if (newC === -1 || newR === -1) {
      return;
    }

    let board = this.state.board;
    let turn = board[newC][newR];

    // directions to check from tile
    // [c, r]
    const directions = [
      [1 , 0],  // right
      [0 , 1],  // up
      [-1, 0],  // left
      [0 ,-1],  // down
      [1 , 1],  // right,up
      [-1, 1],  // left, up
      [-1,-1],  // left, down
      [1 ,-1]   // right,down
    ];

    for (let d_i = 0; d_i < directions.length; d_i ++) {
      let d = directions[d_i];

      let i = 1;
      while(turn === (board[newC + (d[0] * i)] && board[newC + (d[0] * i)][newR + (d[1] * i)])) {
        i ++;
        if (i === 4) {
          // WINNER
          console.log("WINNER: " + turn);

          let j = 0;
          while (j < 4) {
            board[newC + (d[0] * j)][newR + (d[1] * j)] = turn === 0 ? 10 : 11;
            j ++;
          }

          this.setState({
            winner: turn
          });

          break;
        }
      }
    }
  }

  onColumnClick(colInd) {
    let board = this.state.board;
    let turn = this.state.turn;
    let winner = this.state.winner;

    if(winner !== -1) {
      // winner found
      return;
    }

    let rClicked = -1;

    // add token
    for (let i = 0; i < window.BOARD_HEIGHT; i ++) {
      if (board[colInd][i] === -1) {
        board[colInd][i] = turn;
        rClicked = i;
        break;
      }
    }

    this.setState({
      board: board,

      // flip turn
      turn: (turn === 0 ? 1 : 0),

      // set clicked tile
      lastColumnClicked: colInd,
      lastRowClicked: rClicked
    });
  }

  onColumnEnter(colInd) {
    this.setState({
      selectedCol: colInd
    });
  }

  renderHeader() {
    let turn = this.state.turn;
    let winner = this.state.winner;

    if (winner !== -1) {
      return (
        <div className="header">
          <img 
            width="64"
            height="64"
            src={winner === 0 ? redTileImage : yellowTileImage} />
          Wins!
        </div>
      );
    }
    
    return (
      <div className="header">
        <img 
          width="64"
          height="64"
          src={turn === 0 ? redTileImage : yellowTileImage} />
        's turn
      </div>
    );
  }

  render() {
    let turn = this.state.turn;
    let board = this.state.board;
    let selectedCol = this.state.selectedCol;

    let Cols = board.map((d, ind) => {
      return (
        <div 
          key={ind + "-col"} 
          onClick={() => this.onColumnClick(ind)}
          onMouseEnter={() => this.onColumnEnter(ind)}
        >
          <Column 
            columnData={d} 
            selected={ind === selectedCol}
            colIndex={ind} />
        </div>
      );
    });

    return (
      <div>
        {this.renderHeader()}
        <div className="board">
          {Cols}
        </div>
      </div>
    );
  }
}

export default Connect4;
