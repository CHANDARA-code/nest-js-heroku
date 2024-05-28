import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  NotAcceptableException,
  RequestTimeoutException,
  ConflictException,
  GoneException,
  HttpVersionNotSupportedException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  InternalServerErrorException,
  NotImplementedException,
  ImATeapotException,
  MethodNotAllowedException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
  PreconditionFailedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppException } from './app-exception';
import { ApiResponseService } from '@core/api-response-service/api-reponse-service';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (!(exception instanceof AppException)) {
      let message: string;
      let technicalMessage: string;
      let statusCode: number;

      switch (true) {
        case exception instanceof BadRequestException:
          message = 'Bad request';
          technicalMessage = 'The request could not be understood by the server';
          statusCode = HttpStatus.BAD_REQUEST;
          break;

        case exception instanceof UnauthorizedException:
          message = 'Unauthorized';
          technicalMessage = 'You are not authorized to access this resource';
          statusCode = HttpStatus.UNAUTHORIZED;
          break;

        case exception instanceof NotFoundException:
          message = 'Resource not found';
          technicalMessage = 'The requested resource could not be found';
          statusCode = HttpStatus.NOT_FOUND;
          break;

        case exception instanceof ForbiddenException:
          message = 'Forbidden';
          technicalMessage = 'You do not have permission to access this resource';
          statusCode = HttpStatus.FORBIDDEN;
          break;

        case exception instanceof NotAcceptableException:
          message = 'Not Acceptable';
          technicalMessage = 'The requested resource is not acceptable';
          statusCode = HttpStatus.NOT_ACCEPTABLE;
          break;

        case exception instanceof RequestTimeoutException:
          message = 'Request Timeout';
          technicalMessage = 'The request took too long to complete';
          statusCode = HttpStatus.REQUEST_TIMEOUT;
          break;

        case exception instanceof ConflictException:
          message = 'Conflict';
          technicalMessage = 'There was a conflict with the request';
          statusCode = HttpStatus.CONFLICT;
          break;

        case exception instanceof GoneException:
          message = 'Gone';
          technicalMessage = 'The requested resource is no longer available';
          statusCode = HttpStatus.GONE;
          break;

        case exception instanceof HttpVersionNotSupportedException:
          message = 'HTTP Version Not Supported';
          technicalMessage = 'The HTTP version used in the request is not supported';
          statusCode = HttpStatus.HTTP_VERSION_NOT_SUPPORTED;
          break;

        case exception instanceof PayloadTooLargeException:
          message = 'Payload Too Large';
          technicalMessage = 'The request payload is too large';
          statusCode = HttpStatus.PAYLOAD_TOO_LARGE;
          break;

        case exception instanceof UnsupportedMediaTypeException:
          message = 'Unsupported Media Type';
          technicalMessage = 'The request media type is not supported';
          statusCode = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
          break;

        case exception instanceof UnprocessableEntityException:
          message = 'Unprocessable Entity';
          technicalMessage = 'The request was well-formed but was unable to be followed due to semantic errors';
          statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
          break;

        case exception instanceof InternalServerErrorException:
          message = 'Internal Server Error';
          technicalMessage = 'The server encountered an internal error';
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          break;

        case exception instanceof NotImplementedException:
          message = 'Not Implemented';
          technicalMessage = 'The requested method is not supported';
          statusCode = HttpStatus.NOT_IMPLEMENTED;
          break;

        case exception instanceof ImATeapotException:
          message = "I'm a Teapot";
          technicalMessage = 'The server refuses to brew coffee because it is a teapot';
          statusCode = HttpStatus.I_AM_A_TEAPOT;
          break;

        case exception instanceof MethodNotAllowedException:
          message = 'Method Not Allowed';
          technicalMessage = 'The requested method is not allowed for this resource';
          statusCode = HttpStatus.METHOD_NOT_ALLOWED;
          break;

        case exception instanceof BadGatewayException:
          message = 'Bad Gateway';
          technicalMessage = 'The server received an invalid response from an upstream server';
          statusCode = HttpStatus.BAD_GATEWAY;
          break;

        case exception instanceof ServiceUnavailableException:
          message = 'Service Unavailable';
          technicalMessage = 'The server is currently unavailable';
          statusCode = HttpStatus.SERVICE_UNAVAILABLE;
          break;

        case exception instanceof GatewayTimeoutException:
          message = 'Gateway Timeout';
          technicalMessage = 'The server did not receive a timely response from an upstream server';
          statusCode = HttpStatus.GATEWAY_TIMEOUT;
          break;

        case exception instanceof PreconditionFailedException:
          message = 'Precondition Failed';
          technicalMessage = 'The server does not meet one of the preconditions specified in the request';
          statusCode = HttpStatus.PRECONDITION_FAILED;
          break;

        default:
          if (exception instanceof HttpException) {
            message = exception.message;
            technicalMessage = (exception.getResponse() as any)?.message;
            statusCode = exception.getStatus();
          } else {
            message = 'Internal Server Error';
            technicalMessage = exception.message;
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          }
          break;
      }

      exception = new AppException(message, technicalMessage, statusCode);
    }

    const apiResponse = ApiResponseService.createError(exception.statusCode, exception.message, exception.technicalMessage);
    response.status(exception.statusCode).json(apiResponse);
  }
}
