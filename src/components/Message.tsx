import { IMessage } from "../interfaces/IMessage";
import { useEffect } from "react";
import { useState } from "react";

const Message = (message: IMessage) => {
  const [formattedTimestamp, setFormattedTimestamp] = useState('');
  const [timestamp, setTimestamp] = useState('');
  

  useEffect(() => {
    fetchTimestamp();
  }, []);

  const fetchTimestamp = async () => {
    try {
      const result = await fetch("/api/timestamp");
      const { timestamp: data } = await result.json();
      setTimestamp(data);
      displayFormattedTimestamp(data);

    } catch (error) {
      console.log("Error fetching timestamp:", error);
    }
  };

  const displayFormattedTimestamp = (data: string) => {
    const dateObj = new Date(data);

    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();

    setFormattedTimestamp(`${date} ${time}`);
  };

  return (
    <div className="message p-3 my-2 bg-blue-100 rounded-lg">
      <div className="message-header flex justify-between items-center mb-2">
        <span className="sender font-semibold">{message.sender}</span>
        <span className="timestamp text-sm text-gray-600">{formattedTimestamp}</span>
      </div>
      <div className="message-content text-gray-800">{message.content}</div>
    </div>
  );
};

export default Message;
