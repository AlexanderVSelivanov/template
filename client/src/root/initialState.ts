import {ApplicationError, EmptyOr, Empty} from 'template-common';
import {AppNotification} from 'types/AppNotification';

export default {
  notifications: [] as AppNotification[],
  newNotificationsFrom: new Date(0)  as Date,
  isApplicationInitialized: false,
  error: Empty as EmptyOr<ApplicationError>,
};
