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

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let exceptionResponse: ExceptionResponse;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      exceptionResponse = exception.getResponse() as ExceptionResponse;
    }

    // eslint-disable-next-line no-console
    // console.error(exception);

    const responseData: ResponseType = {
      data: null,
      error: {
        errorCode: exceptionResponse?.errorCode || exception.message || 'INTERNAL_SERVER_ERROR',
        timestamp: new Date(),
      },
    };

    response.status(statusCode).json(responseData);
  }
}
