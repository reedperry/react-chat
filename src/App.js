import React, { useState } from 'react';
import useSocket from './useSocket';
import logo from './logo.svg';
import './App.css';

const url = 'ws://localhost:8080';
const socket = new WebSocket(url);

function App() {
  const { messages, send } = useSocket(socket);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="messages">
        <SentMessages />
        <ReceivedMessages messages={messages} />
        <MessageEditor onSendMessage={send} />
      </div>
    </div>
  );
}

function SentMessages() {
  return (
    <div
      style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
      Sent messages...
    </div>
  );
}

function ReceivedMessages(props) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
      {props.messages.map(msg => (
        <div
          style={{
            borderRadius: 5,
            border: '1px solid lightgreen',
            margin: 10,
            padding: 10
          }}
          key={msg.id}>
          {msg.content}
        </div>
      ))}
    </div>
  );
}

function MessageEditor(props) {
  const [message, setMessage] = useState('');

  return (
    <div>
      <input
        style={{ borderRadius: 3 }}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        onClick={() => submitMessage(message, props.onSendMessage, setMessage)}>
        Send
      </button>
    </div>
  );
}

function submitMessage(message, sendMessage, setMessage) {
  sendMessage(message);
  setMessage('');
}

export default App;
