import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AppError } from '../app-error/app-error';

export class AppException extends AppError {
  statusCode: number;
  message: string;
  technicalMessage: any;

  constructor(message: string, technicalMessage: any, statusCode: number) {
    super(message, technicalMessage, statusCode);
    this.name = 'AppException';
    this.statusCode = statusCode ?? HttpStatus.EXPECTATION_FAILED;
    this.message = message;
    this.technicalMessage = technicalMessage;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, AppException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static fromQueryFailedError(
    error: QueryFailedError,
    message: string,
  ): AppException {
    return new AppException(message, error.message, HttpStatus.BAD_GATEWAY);
  }

  static fromAppError(error: AppError): AppException {
    return new AppException(
      error.message,
      error.technicalMessage,
      error.statusCode,
    );
  }

  static fromHttpException(
    error: HttpException,
    message: string,
  ): AppException {
    return new AppException(message, error.message, error.getStatus());
  }

  static handle(error: any, message: string): AppException {
    switch (true) {
      case error instanceof QueryFailedError:
        return this.fromQueryFailedError(error, message);
      case error instanceof AppError:
        return this.fromAppError(error);
      case error instanceof HttpException:
        return this.fromHttpException(error, message);
      default:
        return new AppException(
          'Internal Server Error',
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  getStatus() {
    return this.statusCode;
  }

  getResponse() {
    return this.message;
  }

  getResponseTechnical() {
    return this.technicalMessage;
  }
}
