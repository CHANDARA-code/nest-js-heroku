import {
  HttpStatus,
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import { AppException } from '../app-exception/app-exception';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) =>
          error.constraints ? Object.values(error.constraints).join(', ') : '',
        )
        .filter((message) => message !== '')
        .join(', ');
      throw new AppException(errorMessage, errors, HttpStatus.BAD_REQUEST);
    }

    return value;
  }

  private toValidate(
    metatype:
      | { new (...args: any[]): any }
      | ObjectConstructor
      | StringConstructor
      | BooleanConstructor
      | NumberConstructor
      | ArrayConstructor,
  ): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as any);
  }
}
