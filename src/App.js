import React, { useState } from 'react';
import useSocket from './useSocket';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [socketError, setSocketError] = useState(false);

  function attemptSocketConnection(token) {
    const conn = connect(token);
    const poll = setInterval(() => {
      if (conn.readyState === WebSocket.OPEN) {
        setSocket(conn);
        setSocketError(false);
        clearInterval(poll);
      } else if (conn.readyState === WebSocket.CLOSED) {
        setSocketError(true);
        clearInterval(poll);
      }
    }, 20)
  }

  return (
    <div className="App">
      {!socket && <Connector onConnect={attemptSocketConnection} />}
      {socket && <Chat socket={socket} />}
      {socketError && <h3>Failed to connect!</h3>}
    </div>
  );
}

function Chat(props) {
  const { messages, send } = useSocket(props.socket);
  const [sentMessages, setSentMessages] = useState([]);

  function sendMessage(message) {
    send(message);
    setSentMessages([
      ...sentMessages,
      { content: message, id: Math.round(Math.random() * 100000) }
    ]);
  }

  return (
    <div className="messages">
      <SentMessages messages={sentMessages} />
      <ReceivedMessages messages={messages} />
      <MessageEditor onSendMessage={sendMessage} />
    </div>
  );
}

function SentMessages(props) {
  return (
    <div
      style={{
        float: 'right',
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'column'
      }}>
      {props.messages.map(msg => (
        <div
          style={{
            borderRadius: 5,
            border: '1px solid #0088cc',
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

function ReceivedMessages(props) {
  return (
    <div
      style={{
        float: 'left',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column'
      }}>
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
      <button type="button" onClick={() => props.onConnect(token)}>
        Connect
      </button>
    </div>
  );
}

function submitMessage(message, sendMessage, setMessage) {
  sendMessage(message);
  setMessage('');
}

function connect(token) {
  const url = 'ws://localhost:8080?token=' + token;
  const socket = new WebSocket(url);
  return socket;
}

export default App;
