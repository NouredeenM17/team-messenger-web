import { IFileMessage } from '../interfaces/IFileMessage';
import { base64ToBlob, formatTimeStamp } from '../utils/utilFunctions';

const FileMessage = ( message: IFileMessage ) => {

  const usernameInStorage: string = localStorage.getItem("tm-username") || '"user"';
  const username: string = usernameInStorage.substring(1,usernameInStorage.length-1);

  const messageStyle = (username === message.sender)
  ?"message p-3 my-2 bg-blue-100 rounded-lg"
  :"message p-3 my-2 bg-gray-100 rounded-lg";

  // Formatting timestamp
  const formattedDate = formatTimeStamp(message.timestamp || '');
console.log(message.file.filename);
  const blob = base64ToBlob(message.file.payload, message.file.filetype);

  // Function to handle file download
  const handleFileDownload = () => {

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = message.file.filename; // Set the desired filename
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={messageStyle}>
      <div className="message-header flex justify-between items-center mb-2">
        <span className="sender font-semibold">{message.sender}</span>
        <span className="timestamp text-sm text-gray-600">{formattedDate}</span>
      </div>
      <div className="message-content text-gray-800">
        {/* Display the filename as a clickable link */}
        <span
          className="file-link cursor-pointer text-blue-500"
          onClick={handleFileDownload}
        >
          {message.file.filename}
        </span>
      </div>
    </div>
  );
};

export default FileMessage;
