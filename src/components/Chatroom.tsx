import { useState } from "react";
import ConnectedUserList from "./ConnectedUserList";
import MessagesContainer from "./MessagesContainer";
import MessageInputField from "./MessageInputField";
import { IMessage } from "../interfaces/IMessage";
import useWebSocket from "../hooks/useWebSocket";
import { ISocketMessage } from "../interfaces/ISocketMessage";
import { ITextMessage } from "../interfaces/ITextMessage";
import { IFileMessage } from "../interfaces/IFileMessage";

const Chatroom = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const userId = localStorage.getItem("tm-user-id");
  // TEMP
  const roomId = 'among';
  

  const handleSendMessage = (newMessage: IMessage) => {
    
  switch (newMessage.type) {
    case 'plaintext':
      sendPlainTextMessage(newMessage as ITextMessage);
      break;
    case 'file':
      sendFileMessage(newMessage as IFileMessage);
      break; 
  }
    
  };

  const handleReceiveMessage = (data: string) => {
    const socketMessage:ISocketMessage = JSON.parse(data);

    switch(socketMessage.type){
      case 'plaintext':
        addPlainTextMessage(socketMessage);
        break;
      case 'file':
        addFileMessage(socketMessage);
        break;
      default:
        console.error('message type not defined default switch case run');
    }
  };

  const addPlainTextMessage = (socketMessage: ISocketMessage) => {
    const msg: ITextMessage = {
      type: socketMessage.type,
      content: socketMessage.payload,
      sender: socketMessage.sender,
      timestamp: socketMessage.timestamp
    }
    setMessages([...messages, msg]);
  }

  const addFileMessage = (socketMessage: ISocketMessage) => {

    const msg: IFileMessage = {
      type: socketMessage.type,
      content: socketMessage.payload,
      sender: socketMessage.sender,
      timestamp: socketMessage.timestamp,
      file: socketMessage.file!
    }
    setMessages([...messages, msg]);
  }

  const sendPlainTextMessage = (newMsg: ITextMessage) => {
    const msg: ISocketMessage = {
      type: newMsg.type,
      roomId: roomId,
      payload: newMsg.content,
      sender: newMsg.sender,
      timestamp: newMsg.timestamp
    }
    sendMessage(JSON.stringify(msg));
  }

  const sendFileMessage = async (newMsg: IFileMessage) => {
    
    const msg = {
      type: newMsg.type,
      roomId: roomId,
      payload: newMsg.content,
      sender: newMsg.sender,
      file: newMsg.file
    }
    sendMessage(JSON.stringify(msg));
  }

  const { sendMessage } = useWebSocket(
    handleReceiveMessage,
    roomId,
    () => {
      console.error(
        "An error has occured while receiving message in Chatroom.tsx"
      );
    }
  );

  return (
    <div className="flex justify-center items-center border-2 border-gray-300 rounded-lg">
      <div className="grid grid-cols-6 h-screen p-6 w-full h-full bg-gray-50 rounded-lg">
        <div className="col-span-2 min-w-[20%] min-h-screen">
          <ConnectedUserList connectedUsers={users} />
        </div>
        <div className="col-span-4 flex flex-col min-w-[80%] min-h-screen">
          <div className="flex-grow">
            <MessagesContainer messages={messages} />
          </div>
          <div className="flex-none">
            <MessageInputField onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
