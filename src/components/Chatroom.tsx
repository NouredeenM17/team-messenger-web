import { useState } from 'react';
import ConnectedUserList from './ConnectedUserList';
import MessagesContainer from './MessagesContainer';
import MessageInputField from './MessageInputField';
import { IMessage } from '../interfaces/IMessage';

  const Chatroom = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
  
    const handleSendMessage = (newMessage: IMessage) => {
      
      setMessages([...messages, newMessage]);
    };
  
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
  