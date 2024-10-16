import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { WsException, BaseWsExceptionFilter } from '@nestjs/websockets';
import { ISocketWithUser } from './interfaces/socket-user.interface';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<ISocketWithUser>();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };
    client.emit('error', {
      id: client.id,
      ...details,
    });
  }
}
