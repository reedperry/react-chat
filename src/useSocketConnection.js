import { useState } from 'react';

export default function useSocketConnection(token) {
  const [socket, setSocket] = useState(null);
  const [socketError, setSocketError] = useState(false);

  if (!token) {
    return {
      socket: null,
      socketError: null
    };
  } else if (!socket) {
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
    }, 20);
  }

  return {
    socket,
    socketError
  };
}

function connect(token) {
  const url = 'ws://localhost:8080?token=' + token;
  const socket = new WebSocket(url);
  return socket;
}