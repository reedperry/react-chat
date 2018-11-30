import React from 'react';
import { SENT } from './App';

export default function Message(props) {
  return (
    <div
      style={{
        margin: 5
      }}>
      <span className="message-sender-name">
        {props.type === SENT ? 'You' : props.message.sender.username}:
      </span>{' '}
      <div
        style={{
          display: 'inline-block',
          borderRadius: 5,
          border: props.type === SENT ? '1px solid lightgreen': '1px solid #0088cc',
          padding: 10
        }}>
        {props.message.content}
      </div>
    </div>
  );
}
