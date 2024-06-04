import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationPayloadDto } from './notification-payload.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SendToTopicDto {
  @ApiProperty({ example: 'HAHA' })
  @IsString()
  topic: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => NotificationPayloadDto)
  payload: NotificationPayloadDto;
}
