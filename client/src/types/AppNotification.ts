export enum AppNotificationPriority {Success, Information, Warning, Error}

export type AppNotification = {
  created: Date,
  text: string,
  priority: AppNotificationPriority,
};

export const isAppNotificationSuccess =
  (notification: AppNotification) => notification.priority === AppNotificationPriority.Success;

export const isAppNotificationInformation =
  (notification: AppNotification) => notification.priority === AppNotificationPriority.Information;

export const isAppNotificationWarning =
  (notification: AppNotification) => notification.priority === AppNotificationPriority.Warning;

export const isAppNotificationError =
  (notification: AppNotification) => notification.priority === AppNotificationPriority.Error;
