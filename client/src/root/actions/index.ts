import ApplicationError from 'src/types/ApplicationError';

import {initializeCompleteCreator, initializeFailCreator} from './types';

export const initializeComplete = initializeCompleteCreator<void>();
export const initializeFail = initializeFailCreator<ApplicationError>();
