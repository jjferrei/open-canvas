import WebSocket from 'isomorphic-ws';

class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        resolve(this.socket);
      };

      this.socket.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });
  }

  send(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (message: string) => void): void {
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {
        callback(event.data as string);
      };
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketClient;
