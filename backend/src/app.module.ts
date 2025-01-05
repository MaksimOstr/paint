import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from './refreshToken/refreshToken.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CacheModule } from '@nestjs/cache-manager';
import { EventsModule } from './events/event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    RefreshTokenModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
