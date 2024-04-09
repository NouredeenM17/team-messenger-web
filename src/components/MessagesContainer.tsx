import Message from './Message'
import { IMessage } from '../interfaces/IMessage';

type Props = {
  messages: IMessage[];
};

const MessagesContainer = ({ messages }: Props) => {
  
  return (
    <div className="messages-container p-4 bg-white rounded-lg shadow">
    {messages.map((message: IMessage, index: number) => (
      <Message key={index} {...message} />
    ))}
  </div>
  )
}

export default MessagesContainer
