import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

/**
 * @author 엄상은
 * @email sangeun.e.9@gmail.com
 * @create date 2024-02-28 14:41:35
 * @modify date 2024-02-28 14:41:35
 * @desc 소켓 hook 분리
 */

export function useSocket() {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/websocket`);
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: function (frame) {
                console.log('Socket Connected: ' + frame);
            }
        });
        client.activate();
        setStompClient(client);
    }, []);

    return stompClient;
}
