import { useState } from 'react';

// A loginInfo object contains a token: string and username: string
export default function useSocketConnection(loginInfo) {
  const [socket, setSocket] = useState(null);
  const [socketError, setSocketError] = useState(false);

  if (!loginInfo || !loginInfo.token) {
    return {
      socket: null,
      socketError: null
    };
  } else if (!socket) {
    const conn = connect(
      loginInfo.token,
      loginInfo.username || 'Anonymous User'
    );
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

function connect(token, username) {
  const url = `ws://localhost:8080?token=${token}&username=${username}`;
  const socket = new WebSocket(url);
  return socket;
}
