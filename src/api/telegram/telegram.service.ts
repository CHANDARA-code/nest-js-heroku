import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import TelegramBot from 'node-telegram-bot-api';
@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private telegramToken: string;
  constructor(private configService: ConfigService<AllConfigType>) {
    this.telegramToken = this.configService.getOrThrow('telegram.token', { infer: true });
    this.onStart(this.telegramToken);
  }

  private onStart(token: string) {
    try {
      this.bot = new TelegramBot(token, { polling: true });
      this.bot.onText(/\/start/, msg => {
        const chatId = msg.chat.id;
        const welcomeMessage = `Hello! To create a group with me, please add me to a group you create. ID: ${chatId}`;
        this.bot.sendMessage(chatId, welcomeMessage).catch(error => {
          console.log(`error: ${error}`);
        });
      });
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  sendMessage() {}
}
