import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<R = any, E = any> {
  code: number;
  success: boolean;
  message: string | null;
  result: StandardResponse<R> | null;
  error: StandardResponse<E> | null;
  timestamp: string;
}

export interface StandardResponse<T = any, G = any> {
  generic: GenericResponse | G | null;
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

export class ApiResponseService {
  /**
   * Creates a success response.
   *
   * @example
   * ```typescript
   * const successResponse = await ApiResponseService.createSuccess({ id: 1, name: 'John' });
   * console.log(successResponse);
   * // {
   * //   code: 200,
   * //   success: true,
   * //   message: 'Request successful',
   * //   result: {
   * //     generic: null,
   * //     response: { id: 1, name: 'John' }
   * //   },
   * //   error: null,
   * //   timestamp: '2023-01-01T00:00:00.000Z'
   * // }
   * ```
   *
   * @param data - The response data.
   * @param generic - Optional generic data.
   * @param message - Success message (default is 'Request successful').
   * @returns A promise resolving to an ApiResponse object containing the success data.
   */
  static async createSuccess<R = any, G = any>(
    data?: R,
    generic?: G,
    message: string = 'Request successful',
  ): Promise<ApiResponse<R>> {
    const response: ApiResponse<R> = {
      code: HttpStatus.OK,
      success: true,
      message,
      result: {
        generic: generic ?? null,
        response: data ?? null,
      },
      error: null,
      timestamp: new Date().toISOString(),
    };

    return response;
  }

  /**
   * Creates an error response.
   *
   * @example
   * ```typescript
   * const errorResponse = ApiResponseService.createError(400, 'Bad Request', 'Invalid input data');
   * console.log(errorResponse);
   * // {
   * //   code: 400,
   * //   success: false,
   * //   message: 'Bad Request',
   * //   result: null,
   * //   error: {
   * //     generic: {
   * //       isError: true,
   * //       message: 'Bad Request',
   * //       technical_message: 'Invalid input data',
   * //       isDialog: true,
   * //       code: '400',
   * //       dialog: {
   * //         title: 'Error',
   * //         message: 'Bad Request',
   * //         code: '400',
   * //         color: 'red',
   * //         icon: 'error_icon',
   * //         image: 'error_image',
   * //       }
   * //     },
   * //     response: null
   * //   },
   * //   timestamp: '2023-01-01T00:00:00.000Z'
   * // }
   * ```
   *
   * @param errorCode - The error code.
   * @param errorMessage - The error message.
   * @param technicalMessage - Optional technical message.
   * @param generic - Optional generic data.
   * @returns An ApiResponse object containing the error data.
   */
  static createError<E, G = any>(
    errorCode: number,
    errorMessage: string,
    technicalMessage?: string,
    generic?: G,
  ): ApiResponse<null, E> {
    const errorGeneric: GenericResponse | G = this.getGeneric<
      GenericResponse | G
    >(errorMessage, errorCode, technicalMessage, generic);
    const errorResponse: ApiResponse<null, E> = {
      code: errorCode,
      success: false,
      message: errorMessage,
      result: null,
      error: {
        generic: {
          ...errorGeneric,
        },
        response: null,
      },
      timestamp: new Date().toISOString(),
    };
    return errorResponse;
  }

  /**
   * Determines whether to return a provided generic response or create a new generic error response.
   *
   * @example
   * ```typescript
   * const genericResponse = ApiResponseService.getGeneric('Error occurred', 500, 'Detailed error message');
   * console.log(genericResponse);
   * // {
   * //   isError: true,
   * //   message: 'Error occurred',
   * //   technical_message: 'Detailed error message',
   * //   isDialog: true,
   * //   code: '500',
   * //   dialog: {
   * //     title: 'Error',
   * //     message: 'Error occurred',
   * //     code: '500',
   * //     color: 'red',
   * //     icon: 'error_icon',
   * //     image: 'error_image'
   * //   }
   * // }
   * ```
   *
   * @param errorMessage - The error message.
   * @param errorCode - The error code.
   * @param technicalMessage - Optional technical message.
   * @param generic - Optional generic data.
   * @returns A GenericResponse object or the provided generic data.
   */
  static getGeneric<G = GenericResponse | any>(
    errorMessage: string,
    errorCode: number,
    technicalMessage?: string,
    generic?: G,
  ): GenericResponse | G {
    return generic
      ? generic
      : this.createGeneric(errorMessage, errorCode, technicalMessage);
  }

  /**
   * Creates a generic error response.
   *
   * @example
   * ```typescript
   * const genericError = ApiResponseService.createGeneric('Not Found', 404);
   * console.log(genericError);
   * // {
   * //   isError: true,
   * //   message: 'Not Found',
   * //   technical_message: 'An error occurred',
   * //   isDialog: true,
   * //   code: '404',
   * //   dialog: {
   * //     title: 'Error',
   * //     message: 'Not Found',
   * //     code: '404',
   * //     color: 'red',
   * //     icon: 'error_icon',
   * //     image: 'error_image'
   * //   }
   * // }
   * ```
   *
   * @param errorMessage - The error message.
   * @param errorCode - The error code.
   * @param technicalMessage - Optional technical message.
   * @returns A GenericResponse object containing the error details.
   */
  static createGeneric(
    errorMessage: string,
    errorCode: number,
    technicalMessage?: string,
  ): GenericResponse {
    return {
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
    };
  }
}
