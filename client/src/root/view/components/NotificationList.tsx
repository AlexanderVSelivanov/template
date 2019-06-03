import React from 'react';
import {AppNotification, AppNotificationPriority} from 'types/AppNotification';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Theme,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import EmptyPagePlaceholder from './EmptyPagePlaceholder';
import {makeStyles} from '@material-ui/styles';
import {amber, green} from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  informationIcon: {
    color: theme.palette.primary.dark,
  },
  successIcon: {
    color: green[600],
  },
  warningIcon: {
    color: amber[700],
  },
  errorIcon: {
    color: theme.palette.error.dark,
  },
}));

type NotificationListProps = {
  notifications: AppNotification[],
  highlightedText?: string,
};

const NotificationList: React.FC<NotificationListProps> = ({notifications, highlightedText}) => {
  const classes = useStyles();

  if (notifications.length === 0) {
    return <EmptyPagePlaceholder text="There aren't any notifications yet."/>;
  }

  function formatText(text: string) {
    if (highlightedText) {
      const textSplit = text.split(highlightedText);
      if (textSplit.length === 1) {
        return text;
      }
      return <span dangerouslySetInnerHTML={{__html: textSplit.join(`<strong>${highlightedText}</strong>`)}}/>;
    }
    return text;
  }

  const renderIcon = (priority: AppNotificationPriority): React.ReactElement => {
    switch (priority) {
      case AppNotificationPriority.Information:
        return <InfoIcon className={classes.informationIcon}/>;
      case AppNotificationPriority.Success:
        return <CheckCircleIcon className={classes.successIcon}/>;
      case AppNotificationPriority.Warning:
        return <WarningIcon className={classes.warningIcon}/>;
      case AppNotificationPriority.Error:
        return <ErrorIcon className={classes.errorIcon}/>;
    }
  };

  return (
    <List>
      {notifications.map(notification => (
        <ListItem key={notification.created.toString()}>
          <ListItemIcon>
            {renderIcon(notification.priority)}
          </ListItemIcon>
          <ListItemText primary={formatText(notification.text)} secondary={notification.created.toLocaleString()}/>
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
