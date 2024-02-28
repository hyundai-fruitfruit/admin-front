import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function useSocket() {
    useEffect(() => {
        const socket = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/websocket`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: function (frame) {
                console.log('Socket Connected: ' + frame);

                // 소켓 발행
                stompClient.publish({
                    destination: '/app/hello',
                    body: '어드민 클라이언트에서 보낸 메시지'
                });
            }
        });
        stompClient.activate();
    }, []);
}
