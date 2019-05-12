import {Logger, QueryRunner} from 'typeorm';
import logger from '../services/loggerService';

export class DataBaseLogger implements Logger {
  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    logger.info(`[DataBase Query] query: ${query} parameters: ${parameters}`);
  }

  logQueryError(error: string, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    logger.error(`[DataBase Query] error: ${error} query: ${query} parameters: ${parameters}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    logger.info(`[DataBase QuerySlow] time: ${time} query: ${query} parameters ${parameters}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    logger.info(`[DataBase SchemaBuild] ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    logger.info(`[DataBase Migration] ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    logger.log(level, `[DataBase] ${message}`);
  }
}
