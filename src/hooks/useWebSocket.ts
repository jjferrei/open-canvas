import React, { useState, useEffect } from 'react';
import WebSocketClient from '../agent/open-canvas/nodes/WebSocketClient';

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocketClient | null>(null);

  useEffect(() => {
    const newSocket = new WebSocketClient(url);
    setSocket(newSocket);

    newSocket.connect().catch((error) => {
      console.error('Failed to connect to WebSocket:', error);
    });

    return () => {
      newSocket.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
    }
  };

  const onMessage = (callback: (message: string) => void) => {
    if (socket) {
      socket.onMessage(callback);
    }
  };

  return { sendMessage, onMessage };
};

export default useWebSocket;
