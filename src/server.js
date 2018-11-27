const WebSocket = require('ws');
const url = require('url');

const SERVER_ID = -1;
const validTokens = ['123a', '456b', '789c'];

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('Server started.');
});

wss.on('connection', (ws, req) => {
  const {
    query: { token }
  } = url.parse(req.url, true);

  if (!token || !validTokens.includes(token)) {
    console.log('Refusing connection with invalid token.');
    ws.close();
    return;
  }

  if (Array.from(wss.clients).some(c => c.id === token)) {
    console.log('Refusing new connection from client: token ' + token + ' is already connected.');
    ws.close();
    return;
  }

  ws.id = token;
  ws.connectionTime = new Date().getTime();

  console.log('New connection:', {
    id: ws.id,
    connectionTime: ws.connectionTime
  });

  ws.on('message', msg => {
    console.log('[server] received: %s', msg, 'from client', ws.id);

    wss.clients.forEach(client => {
      if (/*client !== ws && */client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ content: msg, senderId: ws.id }));
      }
    });
  });

  ws.send(JSON.stringify({ content: 'Welcome to react-chat!', senderId: SERVER_ID }));
});
