import React from 'react';
import Messages from './Messages.jsx';

let offset = null, interval = null

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      clock: 0,
      time: '',
      timeString:'',
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer(){
    let offset = new Date()
    interval = setInterval(this.update.bind(this), 1)
  }

  update() {
    let clock = this.state.clock
    clock += this.calculateOffset()
    this.setState({clock: clock })
    let time = clock;
    this.setState({time: time })

    // let timeString = new Date(time);
    // timeString = timeString.hour;
    // this.setState({timeString: timeString })
  }

  calculateOffset() {
    let now = new Date()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Initial React Component</h1>
        <Messages
          item={"message"}
          date={this.state.date.toLocaleTimeString()}
          time={this.state.time}
        />
      </div>);
  }
}
