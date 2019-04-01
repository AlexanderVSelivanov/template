import {ApplicationError} from 'template-common';

import {initializeCompleteCreator, initializeFailCreator} from './types';

export const initializeComplete = initializeCompleteCreator<void>();
export const initializeFail = initializeFailCreator<ApplicationError>();