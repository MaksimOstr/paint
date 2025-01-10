import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { PrismaService } from 'src/prisma/prisma.service'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private prismaService: PrismaService) {}

  @WebSocketServer()
  server: Server

  afterInit(server: any) {}

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: any) {
    console.log('disconnect')
  }

  @SubscribeMessage('join room')
  async joinRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const isValidRoom = await this.prismaService.socketsRoom.findFirst({
      where: { roomId: data },
    })
    if (!isValidRoom) {
      client.emit('joinError', {
        message: 'Room does not exist or is invalid.',
      })
    } else {
      client.join(data)
      client.emit('joinSuccess', {
        room: data,
        message: 'Successfully joined the room!',
      })
    }
  }
}
