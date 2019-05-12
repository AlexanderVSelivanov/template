import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {DATABASE} from '../config';
import {DataBaseLogger} from './DataBaseLogger';
import {default as InitializeMigration} from './migrations/initialize';
import AccountEntity from './entities/AccountEntity';
import UserEntity from './entities/UserEntity';

export const connect = createConnection({
  type: 'sqlite',
  database: DATABASE,
  synchronize: true,
  entities: [
    AccountEntity,
    UserEntity,
  ],
  migrations: [
    InitializeMigration,
  ],
  migrationsRun: true,
  logging: 'all',
  logger: new DataBaseLogger(),
});
