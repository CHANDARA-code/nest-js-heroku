import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from '@utils/types/entity-condition.type';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { MailService } from '@api/mail/mail.service';
import { NullableType } from '@utils/types/nullable.type';
import { AppException } from '@core/exception/app-exception/app-exception';

@Injectable()
export class UsersService {
  constructor(
    private mailService: MailService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProfileDto: CreateUserDto, isAdmin: boolean): Promise<User> {
    try {
      const newUser = this.usersRepository.save(this.usersRepository.create(createProfileDto));

      if (isAdmin) {
        await this.mailService.userCreatedByAdmin({
          to: createProfileDto.email,
          initialPass: createProfileDto.password,
        });
      }

      return newUser;
    } catch (error) {
      throw AppException.handle(error, error.message);
    }
  }

  findManyWithPagination(paginationOptions: IPaginationOptions): Promise<User[]> {
    return this.usersRepository.find({
      skip: paginationOptions.offset,
      take: paginationOptions.limit,
    });
  }

  standardCount(): Promise<number> {
    return this.usersRepository.count();
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
