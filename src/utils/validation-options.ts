import { HttpStatus, ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { AppException } from '@core/exception/app-exception/app-exception';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    const errorMessages = errors.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.property]: Object.values(currentValue.constraints ?? {}).join(', '),
      }),
      {},
    );

    const formattedMessage = Object.values(errorMessages).join(', ');

    return new AppException(formattedMessage, errorMessages, HttpStatus.UNPROCESSABLE_ENTITY);
  },
};

export default validationOptions;
