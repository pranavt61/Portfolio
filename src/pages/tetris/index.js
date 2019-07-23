import React from 'react';

import Grid from './grid';

class Tetris extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid_width: 12,
      grid_height: 20,
      grid_data: [],
      grid_legend: {},
      tile_size: 40,

      game_speed: 500,

      // tetris state
      current_block: -1,
      current_block_position: [5,0],   // [x, y]

      block_types: [
        {
          id: 1,
          shape: [[1,1,1,1]]
        },
        {
          id: 2,
          shape: [[0,0,1],[1,1,1]]
        },
        {
          id: 3,
          shape: [[1,0,0],[1,1,1]]
        },
        {
          id: 4,
          shape: [[1,1],[1,1]]
        },
        {
          id: 5,
          shape: [[1,1,0],[0,1,1]]
        },
        {
          id: 6,
          shape: [[0,1],[1,1],[0,1]]
        },
        {
          id: 7,
          shape: [[0,1,1],[1,1,0]]
        }
      ]
    };
  }

  componentDidMount() {
    const initGameLoop = this.initGameLoop;
    const initKeyListeners = this.initKeyListeners;

    let grid_width = this.state.grid_width;
    let grid_height = this.state.grid_height;

    // define grid_legend
    let grid_legend = {
      0: '#64646F',     // empty

      // ####
      1: '#00F0F0',     // cyan

      // #
      // ###
      2: '#0000F0',     // blue

      //   #
      // ###
      3: '#F0A000',     // orange

      // ##
      // ##
      4: '#F0F000',     // yellow

      //  ##
      // ##
      5: '#00F000',     // green

      //  #
      // ###
      6: '#A000F0',     // purple

      // ##
      //  ##
      7: '#F00000',      // red

      // test colors
      99: '#FFFFFF'      // white
    };

    // construct grid data
    let grid_data = [];
    for (let x = 0; x < grid_width; x ++) {
      grid_data.push([]);

      for (let y = 0; y < grid_height; y ++) {
        grid_data[x].push(0);
      }
    }


    initKeyListeners();
    initGameLoop();

    this.setState({
      grid_legend: grid_legend,
      grid_data: grid_data
    });
  }

  initKeyListeners = () => {
    const onKeyUp = this.onKeyUp;

    window.onkeyup = onKeyUp;
  };

  initGameLoop = () => {
    let game_speed = this.state.game_speed;
    let updateGameLoop = this.updateGameLoop;

    setInterval(updateGameLoop, game_speed);
  };

  onKeyUp = (e) => {
    const key = e.keyCode ? e.keyCode : e.which;

    let current_block_position = this.state.current_block_position;
    let current_block = this.state.current_block;
    let block_types = this.state.block_types;
    let grid_data = this.state.grid_data;

    let dir_x = 0;
    let dir_y = 0;

    if (key === 39) {
      // right arrow
      dir_x = 1;
    } else if (key === 37) {
      // left arrow
      dir_x = -1;
    } else if (key === 40) {
      // down arrow
      dir_y = 1;
    }

    if (dir_x !== 0 || dir_y !== 0) {
      const block_shape = block_types[current_block].shape;
      const block_id = block_types[current_block].id;

      let block_pos_x = current_block_position[0];
      let block_pos_y = current_block_position[1];

      // erase
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          if (block_shape[x][y] === 1) {
            grid_data[block_pos_x + x][block_pos_y + y] = 0;
          }
        }
      }

      // move
      block_pos_x += dir_x;
      block_pos_y += dir_y;

      //*** Collision Detection ***//
      let collision = false;
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          if (block_shape[x][y] === 0) {
            // empty
            continue;
          }

          if (block_pos_x + x < 0
            || block_pos_x + x >= grid_data.length
            || block_pos_y + y >= grid_data[0].length
            || grid_data[block_pos_x + x][block_pos_y + y] !== 0) {
            // Collision
            block_pos_x -= dir_x;
            block_pos_y -= dir_y;

            collision = true;
            break;
          }
        }

        if (collision === true) {
          break;
        }
      }

      // draw
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          if (block_shape[x][y] === 1) {
            grid_data[block_pos_x + x][block_pos_y + y] = block_id;
          }
        }
      }

      current_block_position = [block_pos_x, block_pos_y];

      this.setState({
        grid_data: grid_data,
        current_block_position: current_block_position
      });
    }
  };

  updateGameLoop = () => {
    let grid_data = this.state.grid_data;
    let current_block = this.state.current_block;
    let current_block_position = this.state.current_block_position;

    const block_types = this.state.block_types;

    // move block
    // NOTE: must come before spawn block
    if (current_block !== -1) {
      const block_shape = block_types[current_block].shape;
      const block_id = block_types[current_block].id;

      let block_pos_x = current_block_position[0];
      let block_pos_y = current_block_position[1];


      // erase current position
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          if (block_shape[x][y] === 1) {
            grid_data[block_pos_x + x][block_pos_y + y] = 0;
          }
        }
      }

      // move position
      block_pos_y ++;

      //*** Collision Detection ***//
      let collision = false;
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          if (block_shape[x][y] === 0) {
            // empty
            continue;
          }

          if (block_pos_y + y > grid_data[0].length
            || grid_data[block_pos_x + x][block_pos_y + y] !== 0) {
            // Collision
            block_pos_y --;

            collision = true;
            break;
          }
        }

        if (collision === true) {
          break;
        }
      }

      // redraw block
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          if (block_shape[x][y] === 1) {
            grid_data[block_pos_x + x][block_pos_y + y] = block_id;
          }
        }
      }

      // update position state
      current_block_position = [block_pos_x, block_pos_y];

      // reset block if collision
      if (collision === true) {
        // reset current block
        block_pos_x = Math.floor(grid_data.length / 2) - 1;
        block_pos_y = 0;

        current_block = -1;
        current_block_position = [block_pos_x, block_pos_y];
      }
    }


    // spawn block
    if (current_block === -1) {

      // choose random block
      current_block = Math.floor(Math.random() * block_types.length)

      // get new position
      let block_pos_x = Math.floor(grid_data.length / 2) - 1;
      let block_pos_y = 0;

      // set block
      const block_shape = block_types[current_block].shape;
      const block_id = block_types[current_block].id;
      for (let x = 0; x < block_shape.length; x ++) {
        for (let y = 0; y < block_shape[x].length; y ++) {
          grid_data[block_pos_x + x][block_pos_y + y] = block_shape[x][y] === 1 ? block_id : 0;
        }
      }

      current_block_position = [block_pos_x, block_pos_y];
    }

    this.setState({
      grid_data: grid_data,
      current_block: current_block,
      current_block_position: current_block_position
    });
  };

  render() {
    let grid_data = this.state.grid_data;
    let grid_legend = this.state.grid_legend;
    let tile_size = this.state.tile_size;

    // component not ready yet
    if (grid_data.length === 0) {
      return (<div />);
    }

    return (
      <div>
        <Grid 
          grid_data={grid_data}
          legend={grid_legend}
          tile_size={tile_size}
        />
      </div>
    );
  }
}

export default Tetris;
