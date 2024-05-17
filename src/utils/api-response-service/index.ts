import { HttpStatus } from '@nestjs/common';

export class ApiResponseService {
  static createSuccess<R>(
    data: R,
    message: string = 'Request successful',
  ): ApiResponse<R> {
    const response: ApiResponse<R> = {
      code: HttpStatus.OK,
      success: true,
      message,
      result: {
        generic: null,
        response: data,
      },
      error: null,
      timestamp: new Date().toISOString(),
    };

    return response;
  }

  static createError<E>(
    errorCode: number,
    errorMessage: string,
    technicalMessage?: string,
  ): ApiResponse<null, E> {
    const errorResponse: ApiResponse<null, E> = {
      code: errorCode,
      success: false,
      message: errorMessage,
      result: null,
      error: {
        generic: {
          isError: true,
          message: errorMessage,
          technical_message: technicalMessage || 'An error occurred',
          isDialog: true,
          code: errorCode.toString(),
          dialog: {
            title: 'Error',
            message: errorMessage,
            code: errorCode.toString(),
            color: 'red',
            icon: 'error_icon',
            image: 'error_image',
          },
        },
        response: null,
      },
      timestamp: new Date().toISOString(),
    };
    return errorResponse;
  }
}

// First, let's define the interfaces as provided:
export interface ApiResponse<R = any, E = any> {
  code: number;
  success: boolean;
  message: string | null;
  result: StandardResponse<R> | null;
  error: StandardResponse<E> | null;
  timestamp: string;
}

export interface StandardResponse<T = any> {
  generic: GenericResponse | null;
  response: T | null;
}

export interface GenericResponse {
  isError: boolean;
  message: string | null;
  technical_message: string | any | null;
  isDialog: boolean;
  code: string;
  dialog: {
    title: string | null;
    message: string | null;
    code: string;
    color: string;
    icon: string;
    image: string;
  };
}

// Example usage:
// const successResponse = ApiResponseService.createSuccess({
//   id: 1,
//   name: 'Test',
// });
// console.log('Success Response:', successResponse);

// const errorResponse = ApiResponseService.createError(404, 'Resource not found');
// console.log('Error Response:', errorResponse);
