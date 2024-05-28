import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {
  statusCode: number;
  message: string;
  technicalMessage: string;

  constructor(message: string, technicalMessage: string, statusCode: number) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode ?? HttpStatus.EXPECTATION_FAILED;
    this.message = message;
    this.technicalMessage = technicalMessage;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  getResponse() {
    return this.message;
  }

  getResponseTechnical() {
    return this.technicalMessage;
  }

  getStatus() {
    return this.statusCode;
  }

  static ThrowIf(condition: boolean, message: string, statusCode: number = HttpStatus.EXPECTATION_FAILED) {
    if (condition) {
      throw new AppError(message, message, statusCode);
    }
  }

  static get if() {
    return {
      aBiggerb: (condition: boolean, message: string, statusCode: number = HttpStatus.EXPECTATION_FAILED) => {
        if (condition) {
          throw new AppError(message, message, statusCode);
        }
      },
    };
  }
}
