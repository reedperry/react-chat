const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on("connection", ws => {
  ws.on("message", msg => {
    console.log("[server] received: %s", msg)
    wss.broadcast(msg)
  })

  ws.send("Welcome!")
})
