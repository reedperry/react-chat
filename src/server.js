const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('Server started.');
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', ws => {
  console.log('There are ', wss.clients.size, 'clients');

  ws.on('message', msg => {
    console.log('[server] received: %s', msg);

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });

    // wss.broadcast(msg);
  });

  ws.send('Welcome to react-chat!');
});
