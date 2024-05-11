import { ITextMessage } from "../interfaces/ITextMessage";
import { formatTimeStamp } from "../utils/utilFunctions";

const TextMessage = (message: ITextMessage) => {

  const usernameInStorage: string = localStorage.getItem("tm-username") || '"user"';
  const username: string = usernameInStorage.substring(1,usernameInStorage.length-1);

  const messageStyle = (username === message.sender)
  ?"message p-3 my-2 bg-blue-100 rounded-lg"
  :"message p-3 my-2 bg-gray-100 rounded-lg";
  
  // Formatting timestamp
  const formattedDate = formatTimeStamp(message.timestamp||'');

  return (
    <div className={messageStyle}>
      <div className="message-header flex justify-between items-center mb-2">
        <span className="sender font-semibold">{message.sender}</span>
        <span className="timestamp text-sm text-gray-600">{formattedDate}</span>
      </div>
      <div className="message-content text-gray-800">{message.content}</div>
    </div>
  );
};

export default TextMessage;
