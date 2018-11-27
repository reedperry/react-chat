import React, { useState } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import useSocket from './useSocket';
import useSocketConnection from './useSocketConnection';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const { socket, socketError } = useSocketConnection(token);

  return (
    <div className="App">
      {!socket && <Connector onSubmit={setToken} />}
      {socket && <Chat socket={socket} token={token} />}
      {socketError && <h3>Failed to connect!</h3>}
    </div>
  );
}

function Chat(props) {
  const { messages, send } = useSocket(props.socket);

  function sendMessage(message) {
    send(props.socket, message);
  }

  return (
    <div className="messages">
      {messages.map(message => {
        if (message.sender === props.token) {
          return <SentMessage message={message} key={message.id} />
        } else {
          return <ReceivedMessage message={message} key={message.id} />
        }
      })}
      <MessageEditor onSendMessage={sendMessage} />
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

function Connector(props) {
  const [token, setToken] = useState('');
  return (
    <div>
      <label htmlFor="token">Token</label>
      <input
        name="token"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <button type="button" onClick={() => props.onSubmit(token)}>
        Connect
      </button>
    </div>
  );
}

function submitMessage(message, sendMessage, setMessage) {
  sendMessage(message);
  setMessage('');
}

export default App;
