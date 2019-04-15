import log from 'loglevel';

import {IS_PRODUCTION} from 'src/config';

if (IS_PRODUCTION) {
  log.setLevel('error');
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
 * Logger for API requests
 * @type {Logger}
 */
export const apiLogger = getLogger('API');

/**
 * Get default logger
 */
export default log;
