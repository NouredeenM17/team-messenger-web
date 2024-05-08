import React, { ChangeEvent } from "react";
import { useState, useRef } from "react";
import { IMessage } from "../interfaces/IMessage";
import { ITextMessage } from "../interfaces/ITextMessage";
import { IFileMessage } from "../interfaces/IFileMessage";
import { blobToBase64, fileToBlob } from "../utils/utilFunctions";
import { IFile } from "../interfaces/IFile";

type Props = {
  onSendMessage: (message: IMessage) => void;
};

const MessageInputField = ({ onSendMessage }: Props) => {
  const senderUsername: string = localStorage.getItem("tm-username") || "";

  const [messageText, setMessageText] = useState("");

  const handleSendText = () => {
    const newMsg: ITextMessage = {
      type: "plaintext",
      content: messageText,
      sender: senderUsername,
    };

    onSendMessage(newMsg);
    setMessageText("");
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const fileName = selectedFile.name;
      const blob = await fileToBlob(selectedFile);
      const base64 = await blobToBase64(blob);

      const fileObj: IFile = {
        filename: fileName,
        filetype: blob.type,
        payload: base64
      } 

      const newMsg: IFileMessage = {
        type: "file",
        content: "",
        sender: senderUsername,
        file: fileObj
      };

      onSendMessage(newMsg);
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
      <div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button onClick={handleFileButtonClick}>Choose File</button>
      </div>
      <button
        onClick={handleSendText}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInputField;
