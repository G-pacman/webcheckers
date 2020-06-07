import React from 'react';
import './index.css';
import Game from './game';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval( () => this.tick(), 1000 );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return(
      <div>
        <Game />
        <div className="game">
          <div className="game-info">
            <div><b>It is {this.state.date.toLocaleTimeString()}.</b></div>
          </div>
        </div>
      </div>
    );
  }

} // end of class App

