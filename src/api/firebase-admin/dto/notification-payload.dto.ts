import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsOptional, IsUrl } from 'class-validator';

class NotificationDto {
  @ApiProperty({ example: 'Hi There' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'This message is powered by swagger' })
  @IsString()
  @IsOptional()
  body?: string;

  @ApiProperty({
    example: 'string',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

class DataDto {
  @ApiProperty()
  @IsString()
  key1: string;

  @ApiProperty()
  @IsString()
  key2: string;
}

export class NotificationPayloadDto {
  @ApiProperty()
  @IsObject()
  notification: NotificationDto;

  @ApiProperty()
  @IsObject()
  data: DataDto;
}
