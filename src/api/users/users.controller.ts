import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { StandardPaginationResultType } from 'src/utils/types/standard-pagination-result.type';
import { standardPagination } from 'src/utils/standard-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { RoleEnum } from 'src/core/roles/roles.enum';
import { RolesGuard } from 'src/core/roles/roles.guard';
import { Roles } from 'src/core/decorators/roles/roles.decorator';
import { AppJwtAuthGuard } from 'src/core/auth/jwt-auth-guard';
import { AppException } from 'src/core/exception/app-exception/app-exception';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AppJwtAuthGuard, RolesGuard)
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    try {
      return this.usersService.create(createProfileDto, true);
    } catch (error) {
      throw AppException.handle(error, error.message);
    }
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe)
    offset: number,
  ): Promise<StandardPaginationResultType<User>> {
    if (limit > 50) {
      limit = 50;
    }

    return standardPagination(
      await this.usersService.findManyWithPagination({
        page,
        limit,
        offset,
      }),
      await this.usersService.standardCount(),
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
