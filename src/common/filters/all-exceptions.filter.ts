import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from '../interceptors/transform.interceptor';

interface ExceptionResponse {
  errorCode: string;
  data?: string;
}

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception?.getResponse() as ExceptionResponse;

    if (process.env.NODE_ENV === 'local') {
      // eslint-disable-next-line no-console
      console.error(exception);
    }

    const responseData: ResponseType = {
      data: null,
      error: {
        errorCode: exceptionResponse?.errorCode || 'Internal server error',
        timestamp: Date.now(),
      },
    };

    response.status(statusCode).json(responseData);
  }
}
