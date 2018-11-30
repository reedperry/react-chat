import React from 'react';
import { RECEIVED } from './App';
import Message from './Message';

export default function ReceivedMessages(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column'
      }}>
      <Message message={props.message} type={RECEIVED} />
    </div>
  );
}
