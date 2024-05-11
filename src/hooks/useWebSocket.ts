import { useEffect, useRef } from "react";

type MessageHandler = (data: any) => void;

const useWebSocket = (
  onMessage: MessageHandler,
  roomId: string,
  sender: string,
  onError?: (event: Event) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
      const initMessage = {
        type: 'initiation',
        sender: sender,
        roomId: roomId
      };
      sendMessage(JSON.stringify(initMessage));

      
      socket.onmessage = (event) => {
        console.log("Received message:", event.data);
        onMessage(event.data);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      if (onError) {
        socket.onerror = onError;
      }
    };

    // Clean-up function
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  };

  return { sendMessage };
};

export default useWebSocket;
