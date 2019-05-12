import * as dotenv from 'dotenv';
import * as path from 'path';
import * as crypto from 'crypto';

import {Environment} from 'template-common';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || Environment.Production;

export const DATABASE = process.env.DATABASE || './template.sqlite';

export const SECRET_KEY = process.env.SECRET_KEY || secretKeyNotDefined();

export const LOG_PATH = process.env.LOG_PATH || path.join(__dirname, '..', '..', 'log');

export const PORT = process.env.PORT || 5000;

function secretKeyNotDefined(): string {
  const warningMessage = 'Secret key not defined. It will use temporary key.';
  // tslint:disable-next-line
  console.warn(warningMessage);
  const temporarySecretKeySize = 48;
  const temporarySecretKeyBase64Url = crypto.randomBytes(temporarySecretKeySize).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return temporarySecretKeyBase64Url;
}
