import { useEffect, useState } from 'react';

export default function useSocket(socket) {
  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      const onMessage = event => {
        setMessages([
          ...messages,
          { content: event.data, id: event.timeStamp }
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
