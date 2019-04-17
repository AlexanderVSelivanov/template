import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

import {NODE_ENV, LOG_PATH, NodeEnvironment} from '../config';

if (!fs.existsSync(LOG_PATH)) {
  fs.mkdirSync(LOG_PATH);
}

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File(
      {
        filename: path.join(LOG_PATH, 'error.log'),
        level: 'error',
      },
    ),
    new winston.transports.File(
      {
        filename: path.join(LOG_PATH, 'combined.log'),
      },
    ),
  ],
});

if (NODE_ENV === NodeEnvironment.Development) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
