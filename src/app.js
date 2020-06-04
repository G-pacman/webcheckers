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
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

} // end of class App

