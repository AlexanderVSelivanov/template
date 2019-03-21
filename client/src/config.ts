/**
 * Absolute or relative path to api host
 * @type {string}
 */
export const API_URL = process.env.REACT_APP_API_URL || '';

/**
 * Application version
 * @type {string}
 */
export const VERSION = process.env.REACT_APP_VERSION || 'no version is set';

/**
 * Router prefix
 * @type {string}
 */
export const ROUTER_PREFIX = process.env.REACT_APP_ROUTER_PREFIX || '';

const productionNodeEnvValue = 'production';

/**
 * Environment mode
 * @type {string}
 */
export const NODE_ENV = process.env.NODE_ENV || productionNodeEnvValue;

/**
 * Is environment in production mode
 * @type {boolean}
 */
export const IS_PRODUCTION = NODE_ENV === productionNodeEnvValue;

/**
 * API request timeout
 * @type {number}
 * @default 0 - no timeout
 */
export const API_REQUEST_TIMEOUT = parseInt(process.env.REACT_APP_API_REQUEST_TIMEOUT || '', 10) || 0;

/**
 * Key name in local storage to set/get token
 * @type {string}
 */
export const LOCAL_STORAGE_TOKEN_KEY_NAME = 'token';

/**
 * Key name in local storage to remember last logged user name
 * @type {string}
 */
export const LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME = 'lastLoggedUserName';
