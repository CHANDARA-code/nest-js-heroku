import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeedService } from './user-seed.service';
import { User } from '@api/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
