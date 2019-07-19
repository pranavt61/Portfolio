import React from 'react';

import "./style.css";

import Grid from './grid.js';

class Snake extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      grid_width: 40,
      grid_height: 40,
      grid_state: [],

      snake_pos: [2,2],

      // s = stop
      // l = left
      // r = right
      // u = up
      // d = down
      snake_dir: 's',
      snake_len: 3,
      snake_stack: [],

      game_speed: 50,
      game_state: 'play'
    };
  }

  componentDidMount() {
    const initGridState = this.initGridState;
    const initGameLoop = this.initGameLoop;
    const initKeyListeners = this.initKeyListeners;

    initKeyListeners();
    initGridState();
    initGameLoop();
  }

  componentDidUpdate(oldProps, oldState) {
    let old_game_state = oldState.game_state;
    let game_state = this.state.game_state;

    if (old_game_state !== game_state) {
      if (game_state === 'over') {
        // game over
        
        if (window.confirm("GAME OVER")) {
          window.location.reload();
        }
      }
    }
  }

  initGridState = () => {
    const width = this.state.grid_width;
    const height = this.state.grid_height;
    const snake_pos = this.state.snake_pos;

    let grid = [];

    for (let i = 0; i < height; i ++) {
      grid.push([]);

      for (let j = 0; j < width; j ++) {
        let t = 'e';

        if (i === 0
          || i === height - 1
          || j === 0
          || j === width - 1) {
          // wall
          t = 'w';
        }

        grid[i].push(t);
      }
    }

    // snake pos
    grid[snake_pos[0]][snake_pos[1]] = 's';

    // first food
    while(true) {
      let randW = Math.floor(Math.random() * (width - 2)) + 1;
      let randH = Math.floor(Math.random() * (height - 2)) + 1;

      if (grid[randH][randW] !== 's') {
        grid[randH][randW] = 'f';

        break;
      }
    }

    // snake stack
    let stack = [[snake_pos[0], snake_pos[1]]];

    this.setState({
      grid_state: grid,
      snake_stack: stack
    });
  }

  initGameLoop = () => {
    const gameloop = this.gameloop;
    const gameSpeed = this.state.game_speed;

    setInterval(gameloop, gameSpeed);
  };

  initKeyListeners = () => {
    const onKeyUp = this.onKeyUp;

    window.onkeyup = onKeyUp;
  };

  gameloop = () => {
    let grid = this.state.grid_state;
    let snake_dir = this.state.snake_dir;
    let snake_pos = this.state.snake_pos;
    let snake_stack = this.state.snake_stack;
    let snake_len = this.state.snake_len;
    let game_state = this.state.game_state;
    let grid_width = this.state.grid_width;
    let grid_height = this.state.grid_height;

    //*** Move Snake ***//
    if (snake_dir === 's') {
      // nothing to update
      return;
    }

    switch(snake_dir) {
      case 'r':
        // right
        snake_pos[0] += 1;
        break;
      case 'l':
        snake_pos[0] -= 1;
        break;
      case 'u':
        snake_pos[1] -= 1;
        break;
      case 'd':
        snake_pos[1] += 1;
        break;
      case 's':
        break;
    }

    let old_tile = grid[snake_pos[0]][snake_pos[1]];
    grid[snake_pos[0]][snake_pos[1]] = 's';

    //*** Collision ***//
    if (old_tile === 'w'
      || old_tile === 's') {
      // game over
      game_state = 'over';
    }

    if (old_tile === 'f') {
      // food
      snake_len += 3;

      // add another food
      while(true) {
        let randW = Math.floor(Math.random() * (grid_width - 2)) + 1;
        let randH = Math.floor(Math.random() * (grid_height - 2)) + 1;

        if (grid[randH][randW] !== 's') {
          grid[randH][randW] = 'f';
          break;
        }
      }
    }

    //*** Manage Stack ***//
    // add stack
    snake_stack.push(snake_pos.slice());
    
    // remove stack
    while(snake_stack.length > snake_len) {
      let last_pos = snake_stack.shift();

      grid[last_pos[0]][last_pos[1]] = 'e';
    }
    
    this.setState({
      snake_pos: snake_pos.slice(),
      snake_stack: snake_stack,
      snake_len: snake_len,

      grid_state: grid,

      game_state: game_state
    });
  };

  onKeyUp = (e) => {
    const key = e.keyCode ? e.keyCode : e.which;

    let snake_dir = this.state.snake_dir;

    let snake_pos = this.state.snake_pos;
    let grid = this.state.grid_state;

    if (key === 39
      && grid[snake_pos[0] + 1][snake_pos[1]] !== 's') {
      // right
      snake_dir = 'r';
    } else if (key === 37
      && grid[snake_pos[0] - 1][snake_pos[1]] !== 's') {
      // left
      snake_dir = 'l';
    } else if (key === 38
      && grid[snake_pos[0]][snake_pos[1] - 1] !== 's') {
      // up
      snake_dir = 'u';
    } else if (key === 40
      && grid[snake_pos[0]][snake_pos[1] + 1] !== 's') {
      // down
      snake_dir = 'd';
    }

    this.setState({
      snake_dir: snake_dir
    });
  };

  render() {
    const grid_state = this.state.grid_state;
    const snake_len = this.state.snake_len - 3;

    return (
      <div>
        <Grid
          state={grid_state}
        />
      </div>
    );
  }
}

export default Snake;
