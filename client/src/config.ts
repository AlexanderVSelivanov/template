import {Environment} from 'template-common';

/**
 * Application title
 * @type {string}
 */
export const APPLICATION_TITLE = 'template';

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

/**
 * Environment mode
 * @type {string}
 */
export const NODE_ENV = process.env.NODE_ENV || Environment.Production;

/**
 * Is environment in production mode
 * @type {boolean}
 */
export const IS_PRODUCTION = NODE_ENV === Environment.Production;

/**
 * API request timeout
 * @type {number}
 * @default 0 - no timeout
 */
export const API_REQUEST_TIMEOUT = parseInt(process.env.REACT_APP_API_REQUEST_TIMEOUT || '', 10) || 0;

/**
 * API request debounce
 * @type {number}
 * @default 0 - no timeout
 */
export const API_REQUEST_DEBOUNCE = parseInt(process.env.REACT_APP_API_REQUEST_DEBOUNCE || '', 10) || 250;

/**
 * Default logger level (can be change by local storage)
 * @type {string}
 */
export const DEFAULT_LOGGER_LEVEL = 'error';

/**
 * Key name in local storage to get logger level
 * @type {string}
 */
export const LOCAL_STORAGE_LOGGER_LEVEL_KEY_NAME = 'loggerLevel';

/**
 * Key name in local storage to set/get token
 * @type {string}
 */
export const LOCAL_STORAGE_TOKEN_KEY_NAME = 'token';

/**
 * Key name in local storage to remember last logged account name
 * @type {string}
 */
export const LOCAL_STORAGE_LAST_USER_NAME_KEY_NAME = 'lastLoggedUserName';

/**
 * Popup message show timeout
 */
export const POPUP_MESSAGE_TIMEOUT = 5000;
