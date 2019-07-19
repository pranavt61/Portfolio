import React from 'react';

import './style.css';

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const grid_state = this.props.state;

    let grid = [];
    let height = grid_state.length;
    if (height === 0) {
      return (<h1>NO GRID</h1>);
    }

    let width = grid_state[0].length;

    for (let i = 0; i < height; i ++) {
      let col = [];
      for (let j = 0; j < width; j ++) {
        col.push(<div className={"tile tile-" + grid_state[i][j]}/>);
      }

      grid.push(<div>{col}</div>);
    }
    
    return (
      <div className="grid">{grid}</div>
    );
  }
}

export default Grid;
