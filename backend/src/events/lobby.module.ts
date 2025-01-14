import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { LobbyController } from './lobby.controller'
import { LobbyGateway } from './lobby.gateway'
import { LobbyService } from './lobby.service'


@Module({
  imports: [PrismaModule],
  providers: [LobbyGateway, LobbyService],
  controllers: [LobbyController]
})
export class LobbyModule {}