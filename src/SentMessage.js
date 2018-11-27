import React from 'react';

export default function SentMessage(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'column'
      }}>
      <div
        style={{
          borderRadius: 5,
          border: '1px solid #0088cc',
          margin: 5,
          padding: 10
        }}>
        {props.message.content}
      </div>
    </div>
  );
}
