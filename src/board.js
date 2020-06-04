import React from 'react';
import './index.css';

function Square(props) {
  return (
    <button id={props.id} key={props.id} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
  renderSquare(row, col) {
    return (
      <Square id={row + "" + col} key={row + "" + col} value={this.props.squares[row][col]} onClick={() => this.props.onClick(col, row)} />
    );
  }

  renderEmpty(row, col) {
    return (
      <Square id={row + "" + col} key={row + "" + col} value={null} onClick={() => null } />
    );
  }

  render() {
    var rows = [];
    var columns = [];
    for (var row = 0; row < 8; row++) {
      for(var col = 0; col < 8; col++) {
        if( this.props.squares[row][col] !== '#' ){
          columns[col] = (this.renderSquare(row, col));
        }
        else {
          columns[col] = (this.renderEmpty(row, col));
        }
      }
      rows[row] = (<div key={row} className="board-row">{columns}</div>);
      columns = [];
    } 
    return (
      rows
    );
  }
}
