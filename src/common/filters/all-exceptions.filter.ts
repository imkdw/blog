import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseType } from '../interceptors/transform.interceptor';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = exception instanceof HttpException ? exception.message : 'Internal server error';

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception);
    }

    const responseBody: ResponseType = {
      error: errorMessage,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
