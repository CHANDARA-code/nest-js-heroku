export const APP_URL = `http://localhost:${process.env.APP_PORT}`;
export const TESTER_EMAIL = 'john.doe@example.com';
export const TESTER_PASSWORD = 'secret';
export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'secret';
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_CLIENT_PORT;
export const M_CONVERT_MINUTE_TO_SECOND = 60 * 1000;
export const LIMIT_REQUEST: number = 100; // Amount of Limit Request from client side in each IP
export const LIMIT_DURATION: number = 15 * M_CONVERT_MINUTE_TO_SECOND; // 15 minute that one IP can request in a limit request // 100 requests per 15 minutes

export enum AssetsEnum {
  'public' = './assets/public/',
  'i18n' = './assets/i18n/',
}
