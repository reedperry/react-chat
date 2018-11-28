import { useEffect, useState } from 'react';

export default function useSocket(socket) {
  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      const onMessage = event => {
        const data = JSON.parse(event.data);
        setMessages([
          ...messages,
          { content: data.content, sender: data.sender, id: event.timeStamp }
        ]);
      };

      function onOpen(event) {
        console.log('You connected!');
      }

      socket.addEventListener('open', onOpen);
      socket.addEventListener('message', onMessage);
      return () => {
        socket.removeEventListener('open', onOpen);
        socket.removeEventListener('message', onMessage);
      };
    },
    [messages]
  );

  return { messages, send };
}

function send(socket, text) {
  if (!text) {
    return;
  }
  socket.send(text);
}
