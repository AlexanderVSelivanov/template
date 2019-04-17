import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export enum NodeEnvironment {
  Production = 'production',
  Development = 'development',
}

export const NODE_ENV = process.env.NODE_ENV || NodeEnvironment.Production;

export const LOG_PATH = process.env.LOG_PATH || path.join(__dirname, '..', '..', 'log');

export const PORT = process.env.PORT || 3000;
