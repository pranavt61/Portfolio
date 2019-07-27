import React from 'react';

// tile images
import tileImg_0 from './res/0.png';
import tileImg_1 from './res/1.png';
import tileImg_2 from './res/2.png';
import tileImg_3 from './res/3.png';
import tileImg_4 from './res/4.png';
import tileImg_5 from './res/5.png';
import tileImg_6 from './res/6.png';
import tileImg_7 from './res/7.png';
import tileImg_8 from './res/8.png';
import tileImg_bomb from './res/bomb.png';
import tileImg_hidden from './res/hidden.png';
import tileImg_flagged from './res/flagged.png';

// tile types stack
// render first char
// ex:
//  h8
//  h0
//  fb
//  f2
const tile_legend = {
  '0': tileImg_0,
  '1': tileImg_1,
  '2': tileImg_2,
  '3': tileImg_3,
  '4': tileImg_4,
  '5': tileImg_5,
  '6': tileImg_6,
  '7': tileImg_7,
  '8': tileImg_8,
  'b': tileImg_bomb,
  'h': tileImg_hidden,
  'f': tileImg_flagged
};

const styles = {
  grid_style: {
    display: 'flex',
    flexDirection: 'row',

    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  column_style: {
    display: 'flex',
    flexDirection: 'column'
  }
};

// Component for each tile in grid
class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: props.tile_size,
      type: props.tile_type
    };
  }

  getTileType = () => {
    return this.state.type;
  };

  setTileType = (type) => {
    this.setState({
      type: type
    });
  };

  render() {
    const tile_type = this.state.type;
    const tile_size = this.state.size;
    const onTileClick = this.props.onTileClick;
    const tile_x = this.props.tile_x;
    const tile_y = this.props.tile_y;

    let tile_style = {
      width: tile_size,
      height: tile_size,

      margin: 1,
    };

    return(
      <img 
        onClick={() => onTileClick(tile_x, tile_y, tile_type)}
        src={tile_legend[tile_type[0]]}
        style={tile_style} />
    );
  }
}

// Wrapper Component for all tiles
class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    let grid_data = this.props.grid_data;   // grid data [x][y]
    let tile_size = this.props.tile_size;   // size of each tile
    let onTileClick = this.props.onTileClick;

    // constuct grid
    let grid = [];

    // init tile ref hash
    this.tile_refs = {};

    for (let x = 0; x < grid_data.length; x ++) {
      let col = [];
      for (let y = 0; y < grid_data[x].length; y ++) {
        col.push(
          <Tile
            key={x + ' - ' + y}
            tile_type={grid_data[x][y]}
            tile_size={tile_size}
            tile_x={x}
            tile_y={y}
            onTileClick={onTileClick}
            ref={(tile) => {this.tile_refs[x + '-' + y] = tile}}
          />
        );
      }

      grid.push(
        <div key={'col - ' + x} style={styles.column_style}>
          {col}
        </div>
      );
    }

    this.setState({
      grid: grid
    });
  }

  componentDidUpdate(oldProps, oldState) {
    const old_grid_data = oldProps.grid_data;
    const new_grid_data = this.props.grid_data;
    let grid = this.state.grid;

    let tile_refs = this.tile_refs;
    
    // check for diff
    for (let x = 0; x < new_grid_data.length; x ++) {
      for (let y = 0; y < new_grid_data[x].length; y ++) {
        const tile_ref_hash = x + '-' + y;
        const tile = tile_refs[tile_ref_hash];
        const tile_type = new_grid_data[x][y];

        if (tile.getTileType() !== tile_type) {
          tile.setTileType(tile_type);
        }
      }
    }
  }

  render() {
    let grid = this.state.grid;
    let grid_style = this.state.grid_style;

    return (
      <div style={styles.grid_style}>
        {grid}
      </div>
    );
  }
}

export default Grid;
