import React from 'react';
import './index.css';
import Board from './board';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
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
      bluepieces: 12,
      redpieces: 12,
      playersturn: 'r',
      loc: [0,0],
      des: [0,0],
      firstclick: true,
      moves: [],
    };
  }

  handleClick(col, row) {
    var squares = this.state.squares.slice();
    if( this.state.firstclick === true  && this.state.playersturn === squares[row][col].toLowerCase() ) {
      this.setState({ loc: [row, col], firstclick: false, });
      document.getElementById(row + "" + col).style.background="yellow";
    } else {
      this.setState({ des: [row,col], firstclick: true, });
      document.getElementById(this.state.loc[0]+""+this.state.loc[1]).style.background="white";
      if( this.isValidMove(squares, row, col) ) this.setMove(squares, col, row);
    }
  }

  setMove(squares, col, row) {
    var newrow = 0, newcol = 0, bp = this.state.bluepieces, rp = this.state.redpieces;

    squares[row][col] = squares[this.state.loc[0]][this.state.loc[1] ];
    squares[this.state.loc[0]][this.state.loc[1]] = '_';

    if( this.state.loc[0] === row+2 ) newrow = row+1;
    if( this.state.loc[0] === row-2 ) newrow = row-1;
    if( this.state.loc[1] === col-2 ) newcol = col-1;
    if( this.state.loc[1] === col+2 ) newcol = col+1;
    if( newrow !== 0 && newcol !== 0 ) {
      ( squares[newrow][newcol].toLowerCase() === 'r' ) ? rp-- : bp--;
      squares[newrow][newcol] = '_';
    }

    for(var i = 0; i < 8; i++) {
      if(squares[7][i] === 'b') squares[7][i] = 'B';
      if(squares[0][i] === 'r') squares[0][i] = 'R';
    }

    this.setState({
      squares: squares,
      bluepieces: bp,
      redpieces: rp,
      playersturn: this.state.playersturn === 'r' ? "b" : "r",
      firstclick: true,
    });
  }

  isValidMove(squares, row, col) {
    var moves = [];
    for (var y = 0; y < 8; y++) {
      for(var x = 0; x < 8; x++) {
        if( squares[y][x].toLowerCase() === 'r' && this.state.playersturn === 'r' ) {
          try{ if(squares[y-1][x+1] === '_') moves.push([x,y,x+1,y-1]); } catch(err){};
          try{ if(squares[y-1][x-1] === '_') moves.push([x,y,x-1,y-1]); } catch(err){}; 
          try{ if(squares[y-2][x+2] === '_' && squares[y-1][x+1].toLowerCase() === 'b') moves.push([x,y,x+2,y-2]); } catch(err){};
          try{ if(squares[y-2][x-2] === '_' && squares[y-1][x-1].toLowerCase() === 'b') moves.push([x,y,x-2,y-2]); } catch(err){};
          if( squares[y][x] === 'R') {
            try{ if(squares[y+1][x+1] === '_') moves.push([x,y,x+1,y+1]);} catch(err){};
            try{ if(squares[y+1][x-1] === '_') moves.push([x,y,x-1,y+1]);} catch(err){};
            try{ if(squares[y+2][x+2] === '_' && squares[y+1][x+1].toLowerCase() === 'b') moves.push([x,y,x+2,y+2]); } catch(err){};
            try{ if(squares[y+2][x-2] === '_' && squares[y+1][x-1].toLowerCase() === 'b') moves.push([x,y,x-2,y+2]); } catch(err){};
          }
        }
        if( squares[y][x].toLowerCase() === 'b' && this.state.playersturn === 'b' ) {
          try{ if(squares[y+1][x+1] === '_') moves.push([x,y,x+1,y+1]);} catch(err){};
          try{ if(squares[y+1][x-1] === '_') moves.push([x,y,x-1,y+1]);} catch(err){};
          try{ if(squares[y+2][x+2] === '_' && squares[y+1][x+1].toLowerCase() === 'r') moves.push([x,y,x+2,y+2]); } catch(err){};
          try{ if(squares[y+2][x-2] === '_' && squares[y+1][x-1].toLowerCase() === 'r') moves.push([x,y,x-2,y+2]); } catch(err){};
          if( squares[y][x] === 'B' ) {
            try{ if(squares[y-1][x+1] === '_') moves.push([x,y,x+1,y-1]); } catch(err){};
            try{ if(squares[y-1][x-1] === '_') moves.push([x,y,x-1,y-1]); } catch(err){}; 
            try{ if(squares[y-2][x+2] === '_' && squares[y-1][x+1].toLowerCase() === 'r') moves.push([x,y,x+2,y-2]); } catch(err){};
            try{ if(squares[y-2][x-2] === '_' && squares[y-1][x-1].toLowerCase() === 'r') moves.push([x,y,x-2,y-2]); } catch(err){};
          }
        }
      }
    }
    this.setState({
      moves: moves,
    });
    var test = [ this.state.loc[1], this.state.loc[0], col, row];
    var i = 0;
    while( moves[i] != null ) {
      if( moves[i][0] === test[0] && moves[i][1] === test[1] && 
          moves[i][2] === test[2] && moves[i][3] === test[3] ){
        return true;
      }
      i++;
    }
    return false;
  }

  checkWinner() {
    if( this.state.bluepieces === 0 ) return 'red won';
    else if ( this.state.redpieces === 0 ) return 'blue won';
    else if ( this.state.moves === [] ) return 'Draw';
    else return null;
  }

  render() {
    const winner = this.checkWinner();
    var status;
    if( winner ) status = winner;
    else status = (this.state.playersturn === 'r' ? 'red' : 'blue') + ' players turn';

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares}  onClick={(col, row) => this.handleClick(col, row)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>loc: row:{this.state.loc[0]} col:{this.state.loc[1]}</div>
          <div>des: row:{this.state.des[0]} col:{this.state.des[1]}</div>
          <div>red:{this.state.redpieces} blue:{this.state.bluepieces}</div>
          <div id="time">time</div>
        </div>
      </div>
    );
  }

} // end of class

