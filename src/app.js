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
    //var x = document.getElementsByClassName("game-info").innerText; //(<div> It is {this.state.date.toLocaleTimeString()} </div> );
    //var x = document.getElementById("time") ;
    // x = "It is"+ this.state.date.toLocaleTimeString(); <div> {x} </div>
    return(
      <div>
        <Game />
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

} // end of class App

