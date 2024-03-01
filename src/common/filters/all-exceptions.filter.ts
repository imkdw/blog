import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from '../interceptors/transform.interceptor';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const statusCode = status || HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(exception.getResponse());

    const responseData: ResponseType = {
      error: exception.message || 'Internal server error',
    };

    response.status(statusCode).json(responseData);
  }
}
