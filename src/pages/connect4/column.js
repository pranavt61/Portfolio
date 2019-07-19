import React from 'react';

import './style.css';
import emptyTileImage from './res/empty-tile.png';
import redTileImage from './res/red-tile.png';
import yellowTileImage from './res/yellow-tile.png';
import redTileWinImage from './res/red-tile-win.png';
import yellowTileWinImage from './res/yellow-tile-win.png';
import selectPointerImage from './res/select-pointer.png';

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let colData = this.props.columnData.slice(0).reverse();    // make copy reverse
    let colInd = this.props.colIndex;
    let selected = this.props.selected;

    // create tile images
    let col = colData.map((d, ind) => {
      let imgSrc = "";

      switch(d) {
        case 0:
          imgSrc = redTileImage;
          break;
        case 1:
          imgSrc = yellowTileImage;
          break;
        case 10:
          imgSrc = redTileWinImage;
          break;
        case 11:
          imgSrc = yellowTileWinImage;
          break;
        case -1:
          imgSrc = emptyTileImage;
          break;
      }

      return (
        <img 
          key={ind + "-" + colInd + "-tile"}
          width="100"
          height="100"
          src={imgSrc}
          className="tile-img" />
        );
    });

    // selected
    if (selected) {
      col.push(<img width="100" height="100" src={selectPointerImage} />);
    }
    
    return (
      <div className="column">
        {col}
      </div>
    );
  }
}

export default Column;
