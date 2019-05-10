import log from 'loglevel';

import {
  DEFAULT_LOGGER_LEVEL,
  LOCAL_STORAGE_LOGGER_LEVEL_KEY_NAME,
} from 'config';

const logLevel = localStorage.getItem(LOCAL_STORAGE_LOGGER_LEVEL_KEY_NAME) && DEFAULT_LOGGER_LEVEL;

if (logLevel) {
  log.setLevel(logLevel);
} else {
  log.enableAll();
}

/**
 * Get named logger
 * @param {string} loggerName
 * @return {Logger}
 */
export const getLogger = (loggerName: string) => log.getLogger(loggerName);

/**
 * Get default logger
 */
export default log;
