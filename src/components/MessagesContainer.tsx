import TextMessage from './TextMessage'
import { IMessage } from '../interfaces/IMessage';
import FileMessage from './FileMessage';
import { IFileMessage } from '../interfaces/IFileMessage';

type Props = {
  messages: IMessage[];
};

const MessagesContainer = ({ messages }: Props) => {
  return (
    <div className="messages-container p-4 bg-white rounded-lg shadow">
    {messages.map((message: IMessage, index: number) => (
      (message.type === 'file')
      ? <FileMessage key={index} {...message as IFileMessage} />
      : <TextMessage key={index} {...message} />
      
    ))}
  </div>
  )
}

export default MessagesContainer
