import TextMessage from "./TextMessage";
import { IMessage } from "../interfaces/IMessage";
import FileMessage from "./FileMessage";
import { IFileMessage } from "../interfaces/IFileMessage";
import { useEffect, useRef } from "react";

type Props = {
  messages: IMessage[];
};

const MessagesContainer = ({ messages }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the MessagesContainer whenever messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="messages-container p-4 bg-white h-full rounded-lg shadow"
      style={{ maxHeight: "78vh", overflowY: "auto" }}
      ref={messagesContainerRef}
    >
      {messages.map((message, index) =>
        message.type === "file" ? (
          <FileMessage key={index} {...(message as IFileMessage)} />
        ) : (
          <TextMessage key={index} {...message} />
        )
      )}
    </div>
  );
};

export default MessagesContainer;
