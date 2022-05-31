import { createLogger, transports, format, info } from 'winston';

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
