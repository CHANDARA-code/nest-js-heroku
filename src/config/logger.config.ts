import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const commonFileTransportSettings = {
  format: format.combine(format.timestamp(), format.json()),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d', // keep logs for 30 days
};
export const logger = WinstonModule.createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('MyApp', {
          colors: true,
          prettyPrint: true,
          processId: true,
        }),
      ),
    }),
    new transports.DailyRotateFile({
      ...commonFileTransportSettings,
      filename: `logs/%DATE%-error.log`,
      level: 'error',
    }),
    new transports.DailyRotateFile({
      ...commonFileTransportSettings,
      filename: `logs/%DATE%-combined.log`,
    }),
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.timestamp(),
        format.printf(info => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});
