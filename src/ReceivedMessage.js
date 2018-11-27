import React from 'react';

export default function ReceivedMessages(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column'
      }}>
        <div
          style={{
            borderRadius: 5,
            border: '1px solid lightgreen',
            margin: 5,
            padding: 10
          }}>
          {props.message.content}
        </div>
    </div>
  );
}
