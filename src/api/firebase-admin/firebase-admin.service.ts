import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { SendToDeviceDto } from './dto/send-to-device.dto';
import { SendToTopicDto } from './dto/send-to-topic.dto';
import { AppException } from '@/core/exception/app-exception/app-exception';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
@Injectable()
export class FirebaseAdminService {
  private adminFirebase = admin;

  constructor(private configService: ConfigService) {
    this.initializeFirebaseAdmin();
  }

  getFirebaseAdminInstance() {
    return this.adminFirebase;
  }

  private initializeFirebaseAdmin(): void {
    try {
      const serviceAccount = this.configService.getOrThrow('firebase.serviceAccount', {
        infer: true,
      });
      const parsedAccount = JSON.parse(serviceAccount);
      this.adminFirebase.initializeApp({
        credential: this.adminFirebase.credential.cert(parsedAccount),
      });
      Logger.log('Firebase Admin initialized successfully', 'FirebaseAdminService');
    } catch (error) {
      Logger.error('Failed to initialize Firebase Admin', error.stack, 'FirebaseAdminModule');
    }
  }

  async sendToDevice(payload: SendToDeviceDto) {
    try {
      const admin = this.getFirebaseAdminInstance();
      const message: Message = {
        token: payload.token,
        notification: payload.payload.notification,
      };
      const response = await admin.messaging().send(message);
      console.log('reponse: ', response);
      return 'sucess';
    } catch (error) {
      console.log('error: ', error);
      throw AppException.handle(error, 'push notifation failed');
    }
  }

  async sendToTopic(payload: SendToTopicDto) {
    try {
      const admin = this.getFirebaseAdminInstance();
      const message: Message = {
        topic: payload.topic,
        notification: payload.payload.notification,
      };
      const response = await admin.messaging().send(message);
      console.log('reponse: ', response);
      return 'sucess';
    } catch (error) {
      console.log('error: ', error);
      throw AppException.handle(error, 'push notifation failed');
    }
  }
}
