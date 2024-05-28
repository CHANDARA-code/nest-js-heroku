import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusSeedService } from './status-seed.service';
import { Status } from '@core/dto/statuses/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusSeedService],
  exports: [StatusSeedService],
})
export class StatusSeedModule {}
