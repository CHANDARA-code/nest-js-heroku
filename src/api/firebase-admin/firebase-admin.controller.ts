import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { SendToDeviceDto } from './dto/send-to-device.dto';
import { SendToTopicDto } from './dto/send-to-topic.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Firebase')
@Controller('firebase-admin')
export class FirebaseAdminController {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  @Post('device')
  async sendToDevice(@Body() sendToDeviceDto: SendToDeviceDto) {
    const result = await this.firebaseAdminService.sendToDevice(sendToDeviceDto);
    return result;
  }

  @Post('topic')
  async sendToTopic(@Body() sendToTopicDto: SendToTopicDto) {
    const result = await this.firebaseAdminService.sendToTopic(sendToTopicDto);
    return result;
  }
}
