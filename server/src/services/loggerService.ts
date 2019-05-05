import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';
import * as moment from 'moment';

import {Environment} from 'template-common';

import {NODE_ENV, LOG_PATH} from '../config';

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
const errorLogFileName = 'error.log';
const combinedFileName = 'combined.log';

if (!fs.existsSync(LOG_PATH)) {
  fs.mkdirSync(LOG_PATH);
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: dateTimeFormat,
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File(
      {
        filename: path.join(LOG_PATH, errorLogFileName),
        level: 'error',
      },
    ),
    new winston.transports.File(
      {
        filename: path.join(LOG_PATH, combinedFileName),
      },
    ),
  ],
});

if (NODE_ENV === Environment.Development) {
  logger.add(new winston.transports.Console({
    format:
      winston.format.printf(msg => `[${moment().format(dateTimeFormat)} ${msg.level}] ${msg.message}`),
  }));
}

export default logger;
