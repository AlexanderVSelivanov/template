import {ApplicationError} from 'template-common';

import {initializeCompleteCreator, initializeFailCreator} from './types';

export const initializeComplete = initializeCompleteCreator<undefined>();
export const initializeFail = initializeFailCreator<ApplicationError>();
