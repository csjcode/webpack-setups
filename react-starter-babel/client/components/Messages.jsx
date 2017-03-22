import React from 'react';

class Messages extends React.Component {
  render() {
    return (
     <div style={{padding:10}}>
        <p>
          My first message
          - {this.props.item}
          - {this.props.date}
          - {this.props.time}
        </p>
      </div>);
  }
}

export default Messages;
