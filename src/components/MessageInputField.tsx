import React from 'react'
import { useState } from 'react';
import { IMessage } from '../interfaces/IMessage';

type Props = {
  onSendMessage: (message: IMessage) => void;
}

const MessageInputField = ({ onSendMessage }: Props) => {
    const senderUsername: string = localStorage.getItem("tm-username") || '';

    const [messageText, setMessageText] = useState('');
  
    const handleSend = () => {
       const timestamp = fetchTimestamp();
      const newMsg: IMessage = {
        content: messageText,
        sender: senderUsername
      }
      onSendMessage(newMsg);
      setMessageText('');
    };

    const fetchTimestamp = async () => {
        try {
          const result = await fetch('/api/timestamp');
          const data: string = await result.json();
          return data;
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
    

  return (
    <div className="message-input flex p-4 bg-gray-200 rounded-lg">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-md border-2 border-gray-300 mr-4"
        />
        <button 
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
  )
}

export default MessageInputField