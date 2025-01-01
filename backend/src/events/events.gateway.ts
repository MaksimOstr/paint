import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { from, map, Observable } from 'rxjs'
import { Server } from 'socket.io'

@WebSocketGateway({

})
export class EventsGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server

  afterInit(server: any) {
      
  }

  handleConnection(client: any, ...args: any[]) {
      console.log('connected')
  }

  handleDisconnect(client: any) {
      console.log('qeqeqeq')
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
    const event = 'events'
    const response = [1, 2, 3]
    
    return from(response).pipe(map((data) => ({ event, data })))
  }
}
