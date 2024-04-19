import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { AppLoggerMiddleware } from './middlewares/AppLoggerMiddleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './HttpExceptionFilter';
import { JwtMiddleware } from './middlewares/JwtMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    AuthModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: 'auth', method: RequestMethod.POST }, 'auth/(.*)')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
