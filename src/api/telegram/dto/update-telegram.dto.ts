import { CreateMessageTelegramDto } from '@/api/telegram/dto/create-message-telegram.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTelegramDto extends PartialType(CreateMessageTelegramDto) {}
