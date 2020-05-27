import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function EmptySquare(props) {
  return (
    <button className="emptysquare">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    var val;
    if(i % 2 != 0 && (i < 8 || i > 16 && i < 24) || i % 2 == 0 && i < 16 && i > 6) {
      val = 'b';
    }
    else if(i % 2 == 0 && (i > 54 || i > 38 && i < 48) || i % 2 != 0 && i > 48 && i < 56 ) {
      val = 'r';
    }
    else {
      val = null;
    }
    return (
      <Square value={val} onClick={() => this.props.onClick(i)} />
    );
  }

  renderEmptySquare(i) {
    return (
      <EmptySquare value={null} />
    );
  }

  render() {
    var rows = [];
    var columns = [];
    for (var i = 0; i < 8; i++) {
      for(var j = 0; j < 8; j++) {
        if((i + j) % 2 == 0) {
          columns[j] = (this.renderEmptySquare(i*8 + j));
        } else {
          columns[j] = (this.renderSquare(i*8 + j));
        }
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
    this.blackcheckers = [];
    this.redcheckers = [];
    this.squares = null;
  }

  handleClick(i) {

  }
  
  render() {
    //var x = document.createElement("TABLE");
    //var squares = this.squares;
    //squares[0][1] = 0;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.squares}
            onClick={(i) => this.handleClick(i)}
          />
        
        </div>
        <div className="game-info">
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
