import {ApplicationError} from 'template-common';

import {initializeCompleteCreator, initializeFailCreator, errorCreator} from './types';

export const initializeCompleteAction = initializeCompleteCreator<undefined>();
export const initializeFailAction = initializeFailCreator<undefined>();
export const errorAction = errorCreator<ApplicationError>();
