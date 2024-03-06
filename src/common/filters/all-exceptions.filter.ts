import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from '../interceptors/transform.interceptor';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (process.env.NODE_ENV === 'local') {
      // eslint-disable-next-line no-console
      console.error(exception);
    }

    const responseData: ResponseType = {
      data: null,
      error: exception.message || 'Internal server error',
    };

    response.status(statusCode).json(responseData);
  }
}
