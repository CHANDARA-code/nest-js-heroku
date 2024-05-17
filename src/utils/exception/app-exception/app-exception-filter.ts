import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from './app-exception';
import { ApiResponseService } from 'src/utils/api-response-service';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const apiResponse = ApiResponseService.createError(
      exception.statusCode,
      exception.message,
      exception.technicalMessage,
    );
    response.status(exception.statusCode).json(apiResponse);
  }
}
