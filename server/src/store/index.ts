import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {DATABASE} from '../config';
import {DataBaseLogger} from './DataBaseLogger';
import {default as InitializeMigration} from './migrations/initialize';
import AccountEntity from './entities/AccountEntity';
import UserEntity from './entities/UserEntity';
import NoteEntity from './entities/NoteEntity';

export const connect = createConnection({
  type: 'sqlite',
  database: DATABASE,
  synchronize: true,
  entities: [
    AccountEntity,
    UserEntity,
    NoteEntity,
  ],
  migrations: [
    InitializeMigration,
  ],
  migrationsRun: true,
  logging: 'all',
  logger: new DataBaseLogger(),
});
