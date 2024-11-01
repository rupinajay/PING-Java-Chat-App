import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { connectWebSocket } from '../utils/websocket';

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stompClient = connectWebSocket((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <Message key={index} content={msg} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;
