import { useEffect, useRef } from "react";

type MessageHandler = (data: any) => void;

const useWebSocket = (
  onMessage: MessageHandler,
  onError?: (event: Event) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");

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
  }, [onMessage, onError]);

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
