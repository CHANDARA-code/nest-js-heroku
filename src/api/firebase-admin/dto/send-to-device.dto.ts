import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationPayloadDto } from './notification-payload.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SendToDeviceDto {
  @ApiProperty({
    example:
      'cjUB1WspSyO8Q7oITSxPyO:APA91bHKRdqxZaJE8ijs7xFkIgBS4oCP4P0yt28bvHmnM8SyS4h8JAveL83ekpayebXa0diZolwPal1u31W-mv6hys0hTExD5duLEr_MM93WsxH1phCzseodBNGCZFBj3vtHmqNOEFoB',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => NotificationPayloadDto)
  payload: NotificationPayloadDto;
}
