import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      r: {props.row} c: {props.column}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(row, col) {
    return (
      <Square row={row} column={col} onClick={() => this.props.onClick(row, col)} />
    );
  }

  render() {
    var rows = [];
    var columns = [];
    for (var i = 0; i < 8; i++) {
      for(var j = 0; j < 8; j++) {
        columns[j] = (this.renderSquare(i, j));
      }
      rows[i] = (<div className="board-row">{columns}</div>);
      columns = [];
    } 
    return (
      rows
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.status = null;
  }

  handleClick(row, col) {
    this.status = "square clicked " + row + col;
  }
  
  render() {
    this.status = "square clicked nul nul";
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(row, col) => this.handleClick(row, col)} />
        </div>
        <div className="game-info">
          <div>{this.status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
}
