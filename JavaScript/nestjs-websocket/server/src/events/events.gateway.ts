import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any): WsResponse<string> {
        return { event: 'message', data: `received: ${data}` };
    }
}
