import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/chat',
    onConnect: () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe('/topic/messages', (message) => {
        onMessageReceived(JSON.parse(message.body).content);
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });

  stompClient.activate();
  return stompClient;
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify({ content: message }),
    });
  }
};
