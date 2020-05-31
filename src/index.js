import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button id={props.id} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function EmptySquare(props) {
  return (
    <button className="emptysquare" onClick={props.onClick}>
    </button>
  );
}

class Board extends React.Component {
  renderSquare(row, col) {
    return (
      <Square id={row + "" + col} value={this.props.squares[row][col]} onClick={() => this.props.onClick(col, row)} />
    );
  }

  renderEmpty(row, col) {
    return (
      <EmptySquare value={null} onClick={() =>null } />
    );
  }

  render() {
    var rows = [];
    var columns = [];
    for (var row = 0; row < 8; row++) {
      for(var col = 0; col < 8; col++) {
        if( this.props.squares[row][col] != '#' ){
          columns[col] = (this.renderSquare(row, col));
        }
        else {
          columns[col] = (this.renderEmpty(row, col));
        }
      }
      rows[row] = (<div className="board-row">{columns}</div>);
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
    this.newrow = 0;
    this.oldrow = 0;
    this.oldcol = 0;
    this.newcol = 0;
    this.state = {
      squares: [
        ['#','b','#','b','#','b','#','b'],
        ['b','#','b','#','b','#','b','#'],
        ['#','b','#','b','#','b','#','b'],
        ['_','#','_','#','_','#','_','#'],
        ['#','_','#','_','#','_','#','_'],
        ['r','#','r','#','r','#','r','#'],
        ['#','r','#','r','#','r','#','r'],
        ['r','#','r','#','r','#','r','#'] ],
      blackpieces: 12,
      whitepieces: 12,
      playersturn: 'r',
      date: new Date(),
      status: "r:" + 0 + "c:" + 0,
    };
  }

  handleClick(col, row) {
    var squares = this.state.squares.slice();
    if( this.oldrow == 0 && this.oldcol == 0) {
      if( squares[row][col] != this.state.playersturn) { return 0; }
      document.getElementById(row + "" + col).style.background="yellow";
      this.oldrow = row;
      this.oldcol = col;
    } else {
      this.newrow = row;
      this.newcol = col;
      if( !this.isValidMove() ) return 0;
      var temp = squares[row][col];
      squares[row][col] = squares[this.oldrow][this.oldcol];
      squares[this.oldrow][this.oldcol] = '_';
      document.getElementById(this.oldrow + "" + this.oldcol).style.background="white";
      document.getElementById(row + "" + col).style.background="white";
      this.oldrow = 0;
      this.oldcol = 0;
      this.setState({
        squares:squares,
        status: "r:" + row + "c:" + col,
        playersturn: this.state.playersturn == 'r' ? "b" : "r",
      });
    }
  }

  componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
            1000
        );
      }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  isValidMove() {
    var squares = this.state.squares.slice();
    var moves = [];
    for (var y = 0; y < 8; y++) {
      for(var x = 0; x < 8; x++) {
        if( squares[y][x] == this.state.playersturn && this.state.playersturn == 'r' ) {
         if(squares[y-1][x+1] == '_') moves.push( [ [x,y], [y-1][x+1] ] );
         if(squares[y-1][x-1] == '_') moves.push( [ [x,y], [y-1][x-1] ] );
        }
        if( squares[y][x] == this.state.playersturn && this.state.playersturn == 'b' ) {
         if(squares[y+1][x+1] == '_') moves.push( [ [x,y], [y+1][x+1] ] );
         if(squares[y+1][x-1] == '_') moves.push( [ [x,y], [y+1][x-1] ] );
        }
      }
    }
    return  (moves.find(this.validMoveHelper) != null) ? true : false;
  }

  validMoveHelper(value, index, array) {
    var test = [];
    var oldrow = this.oldrow;
    test.push([[oldrow, this.oldcol], [this.newrow, this.newcol]]); 
    return (value == test);
  }
  
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares}  onClick={(col, row) => this.handleClick(col, row)} />
        </div>
        <div className="game-info">
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <div>button pressed: {this.state.status}</div>
          <div>It is {this.state.playersturn} players turn </div>
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
