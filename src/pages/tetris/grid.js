import React from 'react';

// Component for each tile in grid
class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: props.tile_size,
      color: props.tile_color
    };
  }

  getTileColor = () => {
    return this.state.color;
  };

  setTileColor = (color) => {
    this.setState({
      color: color
    });
  };

  render() {
    const tile_color = this.state.color;
    const tile_size = this.state.size;

    let tile_style = {
      width: tile_size,
      height: tile_size,

      margin: 1,

      backgroundColor: tile_color
    };

    return(<div style={tile_style} />);
  }
}

// Wrapper Component for all tiles
class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      grid_style: {
        display: 'flex',
        flexDirection: 'row',

        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    };
  }

  componentDidMount() {
    let grid_data = this.props.grid_data;   // grid data [x][y]
    let legend = this.props.legend;         // grid data -> css class
    let tile_size = this.props.tile_size;   // size of each tile

    let column_style = {
      display: 'flex',
      flexDirection: 'column'
    };

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
            tile_color={legend[grid_data[x][y]]}
            tile_size={tile_size}
            ref={(tile) => {this.tile_refs[x + '-' + y] = tile}}
          />
        );
      }

      grid.push(
        <div key={'col - ' + x} style={column_style}>
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
    const legend = this.props.legend;
    let grid = this.state.grid;

    let tile_refs = this.tile_refs;
    
    // check for diff
    for (let x = 0; x < new_grid_data.length; x ++) {
      for (let y = 0; y < new_grid_data[x].length; y ++) {
        const tile_ref_hash = x + '-' + y;
        const tile = tile_refs[tile_ref_hash];
        const tile_color = legend[new_grid_data[x][y]];

        if (tile.getTileColor() !== tile_color) {
          tile.setTileColor(tile_color);
        }
      }
    }
  }

  render() {
    let grid = this.state.grid;
    let grid_style = this.state.grid_style;

    return (
      <div style={grid_style}>
        {grid}
      </div>
    );
  }
}

export default Grid;
