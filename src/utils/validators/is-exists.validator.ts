import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import { AppException } from '@core/exception/app-exception/app-exception';

@Injectable()
@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    try {
      const repository = validationArguments.constraints[0];
      const pathToProperty = validationArguments.constraints[1];
      const entity: unknown = await this.dataSource.getRepository(repository).findOne({
        where: {
          [pathToProperty ? pathToProperty : validationArguments.property]: pathToProperty ? value?.[pathToProperty] : value,
        },
      });

      return Boolean(entity);
    } catch (error) {
      throw AppException.handle(error.message, error);
    }
  }
}
