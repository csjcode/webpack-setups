import React from 'react';
import Messages from './Messages.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Initial React Component</h1>
        <Messages
          item={"message"}
          date={this.state.date.toLocaleTimeString()}
        />
      </div>);
  }
}
