import {ApplicationError} from 'template-common';

import {
  errorCreator,
  initializeCompleteCreator,
  initializeFailCreator,
  notifyCreator,
  setNewNotificationsFromCreator,
} from './types';
import {AppNotification, AppNotificationPriority} from 'types/AppNotification';

export const notify = notifyCreator<AppNotification>();
export const notifyInformation =
  (text: string) => notify({created: new Date(), priority: AppNotificationPriority.Information, text});
export const notifySuccess =
  (text: string) => notify({created: new Date(), priority: AppNotificationPriority.Success, text});
export const notifyWarning =
  (text: string) => notify({created: new Date(), priority: AppNotificationPriority.Warning, text});
export const notifyError =
  (text: string) => notify({created: new Date(), priority: AppNotificationPriority.Error, text});
export const setNewNotificationsFromAction = setNewNotificationsFromCreator<Date>();
export const initializeCompleteAction = initializeCompleteCreator<undefined>();
export const initializeFailAction = initializeFailCreator<undefined>();
export const errorAction = errorCreator<ApplicationError>();
