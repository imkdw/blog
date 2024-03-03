import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from '../interceptors/transform.interceptor';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    try {
      status = exception.getStatus();
    } catch {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    // eslint-disable-next-line no-console
    console.error(exception);

    const responseData: ResponseType = {
      error: exception.message || 'Internal server error',
    };

    response.status(status).json(responseData);
  }
}
