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
import {
  IDrawRequest,
  ILobbyUser,
  IUserJoinReq,
  IUserLeaveReq,
} from './types/drawEvent.types'
import { EventService } from './event.service'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{

  users: Record<string, ILobbyUser> = {}

  constructor(
    private prismaService: PrismaService,
    private eventService: EventService,
  ) {}

  @WebSocketServer()
  server: Server

  afterInit(server: any) {}

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {
    console.log('disconnect')
  }

  @SubscribeMessage('join room')
  async joinRoom(
    @MessageBody() data: IUserJoinReq,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, username, id } = data
    
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
      const isCreator = isValidRoom.creatorId === id

      this.users[id] = { username, roomId, isCreator }
      this.updateLobbyUsers(roomId)
      client.broadcast.to(roomId).emit('userJoining', { username })
    }
  }

  @SubscribeMessage('left room')
  async leftRoom(
    @MessageBody() data: IUserLeaveReq,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, username, id } = data

    const isDeletedRoom = await this.eventService.deleteRoom(roomId, id)

    if (isDeletedRoom) {
      client.broadcast
        .to(roomId)
        .emit('roomClosing', { message: 'Room was closed by its owner.' })
      this.server.to(roomId).disconnectSockets()
      return
    }

    delete this.users[id];

    client.broadcast.to(roomId).emit('userLeaving', { username })
    client.disconnect()

    this.updateLobbyUsers(roomId)
  }

  @SubscribeMessage('draw')
  async draw(
    @MessageBody() data: IDrawRequest,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.to(data.roomId).emit('drawing', { figure: data.figure })
  }

  updateLobbyUsers(roomId: string) {

    const lobbyUsers = Object.values(this.users)
      .filter((user) => user.roomId === roomId)
      .map((user) => ({ username: user.username, isCreator: user.isCreator }))

    this.server.to(roomId).emit('updateUserList', lobbyUsers)
  }

  @SubscribeMessage('finishDrawing')
  finishDraw(
    @MessageBody('roomId') data: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data).emit('finishDraw', {})
  }
}
