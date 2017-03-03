import React from 'react';
import Messages from './Messages.jsx';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Initial React Component</h1>
        <Messages />
      </div>);
  }
}
