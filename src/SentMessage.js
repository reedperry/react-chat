import React from 'react';
import { SENT } from './App';
import Message from './Message';

export default function SentMessage(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'column'
      }}>
      <Message message={props.message} type={SENT} />
    </div>
  );
}
