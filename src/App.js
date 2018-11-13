import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"

function useSocket(url) {
  const [socket] = useState(new WebSocket(url))
  const [messages, setMessages] = useState([])

  function send(text) {
    if (!text) { return; }
    socket.send(text)
  }

  function onOpen(event) {
    socket.send("[useSocket] Hello, Server!")
  }

  function onMessage(event) {
    console.log("[useSocket] Received message:", event.data)
    setMessages([...messages, { content: event.data, id: event.lastEventId }])
  }

  useEffect(
    () => {
      socket.addEventListener("open", onOpen)
      socket.addEventListener("message", onMessage)
      return () => {
        socket.removeEventListener(onOpen)
        socket.removeEventListener(onMessage)
      }
    },
    [url]
  )

  return [socket, messages, send]
}

function App() {
  const [message, setMessage] = useState("")
  const [socket, messages, sendMessage] = useSocket("ws://localhost:8080")
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {messages.map(msg => (
          <div
            style={{
              borderRadius: 5,
              border: "1px solid lightgreen",
              margin: 10,
              padding: 10
            }}
            key={msg.id}
          >
            {msg.content}
          </div>
        ))}
        <input style={{ borderRadius: 3 }} value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={() => sendMessage(message)}>Send</button>
      </header>
    </div>
  )
}

export default App
