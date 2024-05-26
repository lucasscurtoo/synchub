import {
  Catch,
  ArgumentsHost,
  WsExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WebSocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 'error';
    const message = exception.message;

    client.emit('error', { status, message });
  }
}
