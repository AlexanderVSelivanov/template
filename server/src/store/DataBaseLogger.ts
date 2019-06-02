import {Logger, QueryRunner} from 'typeorm';
import logger from '../services/loggerService';

const databaseLoggerName = 'DB';
const queryLoggerName = `${databaseLoggerName} Query`;
const queryErrorLoggerName = `${databaseLoggerName} QueryError`;
const querySlowLoggerName = `${databaseLoggerName} QuerySlow`;
const schemaBuilderLoggerName = `${databaseLoggerName} SchemaBuild`;
const migrationLoggerName = `${databaseLoggerName} Migration`;

export class DataBaseLogger implements Logger {
  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    logger.info(`[${queryLoggerName}] ${query} (parameters: ${parameters})`);
  }

  logQueryError(error: string, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    logger.error(`[${queryErrorLoggerName}] ${error} (query: ${query} parameters: ${parameters})`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    logger.info(`[${querySlowLoggerName}] time: ${time} (query: ${query} parameters ${parameters})`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    logger.info(`[${schemaBuilderLoggerName}] ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    logger.info(`[${migrationLoggerName}] ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    logger.log(level, `[${databaseLoggerName}] ${message}`);
  }
}
