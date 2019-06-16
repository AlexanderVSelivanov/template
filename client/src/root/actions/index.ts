import {ApplicationError} from 'template-common';

import {
  errorCreator,
  initializeCompleteCreator,
  initializeFailCreator,
  notifyCreator,
  setNewNotificationsFromCreator,
} from './types';
import {AppNotification, AppNotificationType} from 'types/AppNotification';

export const notify = notifyCreator<AppNotification>();
export const notifyInformation =
  (text: string) => notify({created: new Date(), type: AppNotificationType.Information, text});
export const notifySuccess =
  (text: string) => notify({created: new Date(), type: AppNotificationType.Success, text});
export const notifyWarning =
  (text: string) => notify({created: new Date(), type: AppNotificationType.Warning, text});
export const notifyError =
  (text: string) => notify({created: new Date(), type: AppNotificationType.Error, text});
export const setNewNotificationsFromAction = setNewNotificationsFromCreator<Date>();
export const initializeCompleteAction = initializeCompleteCreator<undefined>();
export const initializeFailAction = initializeFailCreator<ApplicationError>();
export const errorAction = errorCreator<ApplicationError>();
