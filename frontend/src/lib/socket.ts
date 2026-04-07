import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/stores/authStore';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:8080/ws';

let stompClient: Client | null = null;

export const connectWebSocket = (
    onConnect?: () => void,
    onError?: (error: string) => void
): Client => {
    const token = useAuthStore.getState().accessToken;

    const client = new Client({
        webSocketFactory: () => new SockJS(WS_URL),
        connectHeaders: {
            Authorization: token ? `Bearer ${token}` : '',
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        onConnect: () => {
            console.log('WebSocket connected');
            onConnect?.();
        },
        onStompError: (frame) => {
            console.error('STOMP error:', frame.headers['message']);
            onError?.(frame.headers['message'] || 'WebSocket error');
        },
        onDisconnect: () => {
            console.log('WebSocket disconnected');
        },
    });

    client.activate();
    stompClient = client;
    return client;
};

export const subscribeToClubChat = (
    clubId: string,
    onMessage: (message: IMessage) => void
) => {
    if (!stompClient?.connected) {
        console.error('WebSocket not connected');
        return null;
    }

    return stompClient.subscribe(`/topic/club/${clubId}/chat`, onMessage);
};

export const sendChatMessage = (clubId: string, content: string) => {
    if (!stompClient?.connected) {
        console.error('WebSocket not connected');
        return;
    }

    const token = useAuthStore.getState().accessToken;

    stompClient.publish({
        destination: `/app/club/${clubId}/chat`,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ content }),
    });
};

export const subscribeToNotifications = (
    userId: string,
    onMessage: (message: IMessage) => void
) => {
    if (!stompClient?.connected) {
        console.error('WebSocket not connected');
        return null;
    }

    return stompClient.subscribe(`/topic/user/${userId}/notifications`, onMessage);
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
};

export { stompClient };
