import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { ErrorType } from './error-type.enum';

const handelPassportError = () =>
  new UnauthorizedException({ message: 'الرجاء تسجيل الدخول' });

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly appEnv: string,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let error: any =
      exception instanceof HttpException
        ? exception
        : new InternalServerErrorException('something went very wrong');

    if (error.message === 'Unauthorized') error = handelPassportError();

    // if (this.appConfig.env === 'production') {
    console.log(exception);
    const rep = {
      type: error.response.errors ? ErrorType.Form : ErrorType.Default,
      message: error.response.errors ? undefined : error.message,
      errors: error.response.errors,
    };
    this.reply(response, rep, error.getStatus());
    // } else {
    //   const rep = {
    //     error: exception,
    //     stack: exception.stack,
    //     message: error.message,
    //   };
    //   this.reply(response, rep, error.getStatus());
    // }
  }

  reply(response: Response, rep: any, status: number) {
    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.reply(response, rep, status);
  }
}
