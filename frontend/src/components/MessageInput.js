import React, { useState } from 'react';
import { sendMessage } from '../utils/websocket';

function MessageInput() {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
