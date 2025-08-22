import winston from 'winston';
import expressWinston from 'express-winston';

const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

export const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: logFormat,
});

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: logFormat,
});
