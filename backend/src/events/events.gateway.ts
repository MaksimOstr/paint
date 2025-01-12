import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { PrismaService } from 'src/prisma/prisma.service'
import { IDrawRequest, IUserJoinReq } from './types/drawEvent.types'

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
    @MessageBody() data: IUserJoinReq,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, username } = data
    const isValidRoom = await this.prismaService.socketsRoom.findFirst({
      where: { roomId },
    })
    if (!isValidRoom) {
      client.emit('joinError', {
        message: 'Room does not exist or is invalid.',
      })
    } else {
      client.join(roomId)
      client.emit('joinSuccess', {
        room: data,
        message: 'Successfully joined the room!',
      })
      client.broadcast.to(roomId).emit('userJoining', { username })
    }
  }

  @SubscribeMessage('left room')
  async leftRoom(
    @MessageBody() data: IUserJoinReq,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, username } = data 
    client.broadcast.to(roomId).emit('userLeaving', { username })
  }

  @SubscribeMessage('draw')
  async draw(
    @MessageBody() data: IDrawRequest,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.to(data.roomId).emit('drawing', { figure: data.figure });
  }


}
