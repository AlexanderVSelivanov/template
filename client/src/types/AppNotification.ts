export enum AppNotificationType {Success, Information, Warning, Error}

export type AppNotification = {
  created: Date,
  text: string,
  type: AppNotificationType,
};

export const appNotificationTypeToString = (type: AppNotificationType) => {
  switch (type) {
    case AppNotificationType.Success:
      return 'Success';
    case AppNotificationType.Information:
      return 'Information';
    case AppNotificationType.Warning:
      return 'Warning';
    case AppNotificationType.Error:
      return 'Error';
  }
};

export const isAppNotificationSuccess =
  (notification: AppNotification) => notification.type === AppNotificationType.Success;

export const isAppNotificationInformation =
  (notification: AppNotification) => notification.type === AppNotificationType.Information;

export const isAppNotificationWarning =
  (notification: AppNotification) => notification.type === AppNotificationType.Warning;

export const isAppNotificationError =
  (notification: AppNotification) => notification.type === AppNotificationType.Error;
