import React from 'react';

import Grid from './grid';

import styles from './styles';

class MineSweeper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid_data: null,
      grid_size: 20,

      num_bombs: 50,

      // 0 -> running
      // 1 -> lost
      // 2 -> won
      game_state: 0
    };
  }

  componentDidMount() {
    const grid_size = this.state.grid_size;
    const num_bombs = this.state.num_bombs;

    let grid_data = [];
    for (let x = 0; x < grid_size; x ++) {
      grid_data.push([]);
      for (let y = 0; y < grid_size; y ++) {
        grid_data[x].push('h0');
      }
    }

    // set bombs
    for (let i = 0; i < num_bombs; i ++) {
      do {
        let rand_x = Math.floor(Math.random() * grid_size);
        let rand_y = Math.floor(Math.random() * grid_size);

        if (grid_data[rand_x][rand_y] !== 'hb') {
          // bomb not placed here
          grid_data[rand_x][rand_y] = 'hb';

          // add surrounding tiles
          for (let x = -1; x <= 1; x ++) {
            for (let y = -1; y <= 1; y ++) {
              const pos_x = rand_x + x;
              const pos_y = rand_y + y;
              if (pos_x >= 0
                && pos_x < grid_size
                && pos_y >= 0
                && pos_y < grid_size) {
                if (grid_data[pos_x][pos_y] !== 'hb') {
                  const new_num = (Number(grid_data[pos_x][pos_y][1]) + 1);
                  grid_data[pos_x][pos_y] = grid_data[pos_x][pos_y][0] + new_num;
                }
              }
            }
          }
          break;
        }
      } while(true);
    }


    this.setState({
      grid_data: grid_data
    });
  }

  componentDidUpdate(oldProps, oldState) {
    const old_game_state = oldState.game_state;

    const game_state = this.state.game_state;
    const grid_size = this.state.grid_size;
    let grid_data = this.state.grid_data;

    if (game_state !== old_game_state) {
      if (game_state === 1) {
        // lost
        for (let x = 0; x < grid_size; x ++) {
          for (let y = 0; y < grid_size; y ++) {
            if (grid_data[x][y] === 'hb') {
              grid_data[x][y] = 'b';
            }
          }
        }

        this.setState({
          grid_data: grid_data
        });
      }
    }
  }

  onTileClick = (x, y, type) => {
    if (this.state.game_state !== 0) {
      // not running
      return;
    }

    const grid_data = this.state.grid_data;
    const grid_size = this.state.grid_size;

    if (type === 'hb') {
      // LOST
      this.setState({
        game_state: 1
      });
    }

    // breath first search
    let stack = [[x,y]];
    while (stack.length > 0) {
      let pop = stack.shift();
      
      const x = pop[0];
      const y = pop[1];

      if (grid_data[x][y][0] !== 'h') {
        // tile already open
        continue;
      }
      grid_data[x][y] = grid_data[x][y][1];

      if (grid_data[x][y][0] !== '0') {
        continue;
      }

      for (let offset_x = -1; offset_x <= 1; offset_x ++) {
        for (let offset_y = -1; offset_y <= 1; offset_y ++) {
          const pos_x = x + offset_x;
          const pos_y = y + offset_y;

          console.log(pos_x + '-' + pos_y);

          if (pos_x >= 0
            && pos_x < grid_size
            && pos_y >= 0
            && pos_y < grid_size) {
            
            if (grid_data[pos_x][pos_y] !== 'hb' && grid_data[pos_x][pos_y][0] === 'h') {
              stack.push([pos_x, pos_y]);
            }
          }
        }
      }
    }

    this.setState({
      grid_data: grid_data
    });
  };
  
  render() {
    const grid_data = this.state.grid_data;
    const onTileClick = this.onTileClick;

    if (grid_data === null) {
      // grid empty
      return (<div />);
    }
    
    return (
      <div>
        <Grid
          grid_data={grid_data}
          tile_size={30}
          onTileClick={onTileClick}
        />
      </div>
    );
  }
}

export default MineSweeper;
