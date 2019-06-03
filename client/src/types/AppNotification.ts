export enum AppNotificationPriority {Success, Information, Warning, Error}

export type AppNotification = {
  created: Date,
  text: string,
  priority: AppNotificationPriority,
};
