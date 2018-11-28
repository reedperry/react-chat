const WebSocket = require('ws');
const url = require('url');

const SERVER_ID = -1;
const SERVER_USERNAME = 'REACT-CHAT';
const validTokens = ['123a', '456b', '789c'];

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('Server started.');
});

wss.on('connection', (ws, req) => {
  const {
    query: { token, username }
  } = url.parse(req.url, true);

  if (!token || !validTokens.includes(token)) {
    console.log(`Refusing connection with invalid token: ${token}`);
    ws.close();
    return;
  }

  if (Array.from(wss.clients).some(c => c.id === token)) {
    console.log(
      `Refusing new connection from client: token ${token} is already connected.`
    );
    ws.close();
    return;
  }

  ws.id = token;
  ws.username = username;
  ws.connectionTime = new Date().getTime();

  console.log('New connection:', {
    id: ws.id,
    username: ws.username,
    connectionTime: ws.connectionTime
  });

  ws.on('message', msg => {
    console.log(`Received: ${msg} from client ${ws.id}`);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            content: msg,
            sender: { id: ws.id, username: ws.username }
          })
        );
      }
    });
  });

  setTimeout(() => {
    ws.send(
      JSON.stringify({
        content: 'Welcome to react-chat!',
        sender: { id: SERVER_ID, username: SERVER_USERNAME }
      })
    );
  }, 500);
});
