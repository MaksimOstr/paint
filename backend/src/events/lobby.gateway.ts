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
  IFinishDrawing,
  ILobbyUser,
  IUserJoinReq,
  IUserLeaveReq,
} from './types/drawEvent.types'
import { LobbyService } from './lobby.service'
import path, { join } from 'path'
import { existsSync, unlinkSync } from 'fs'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class LobbyGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{

  users: Record<string, ILobbyUser> = {}

  constructor(
    private prismaService: PrismaService,
    private eventService: LobbyService,
  ) {}

  @WebSocketServer()
  server: Server

  afterInit(server: any) {}

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('join room')
  async joinRoom(
    @MessageBody() data: IUserJoinReq,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, username, id, userLogo } = data
    
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
      const isUserLogo = userLogo === "" ? null : userLogo

      this.users[id] = { username, roomId, isCreator, userLogo: isUserLogo }
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
      const localFilePath = join(process.cwd(), '/uploads/canvases', `${roomId}.png`);
      if(existsSync(localFilePath)) {
        unlinkSync(localFilePath)
      }
      
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
    const { figure, roomId } = data
    
    client.broadcast.to(roomId).emit('drawing', { figure })
  }

  updateLobbyUsers(roomId: string) {
    const lobbyUsers = Object.values(this.users)
      .filter((user) => user.roomId === roomId)
      .map((user) => ({ username: user.username, isCreator: user.isCreator, userLogo: user.userLogo }))
  
    this.server.to(roomId).emit('updateUserList', lobbyUsers)
  }

  @SubscribeMessage('finishDrawing')
  finishDraw(
    @MessageBody() data: IFinishDrawing,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data

    this.server.to(roomId).emit('finishDraw', {})
  }
}
