import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'
import { PrismaModule } from 'src/prisma/prisma.module'
import { EventController } from './event.controller'
import { EventService } from './event.service'

@Module({
  imports: [PrismaModule],
  providers: [EventsGateway, EventService],
  controllers: [EventController]
})
export class EventsModule {}
