import React from 'react';
import {AppNotification, AppNotificationType} from 'types/AppNotification';
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
import dateFormatter from '../../../utils/formatters/dateFormatter';
import {highlightText} from '../../../utils/StringHelper';

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
    return <EmptyPagePlaceholder text="There aren't any new notifications."/>;
  }

  const renderIcon = (type: AppNotificationType): React.ReactElement => {
    switch (type) {
      case AppNotificationType.Information:
        return <InfoIcon className={classes.informationIcon}/>;
      case AppNotificationType.Success:
        return <CheckCircleIcon className={classes.successIcon}/>;
      case AppNotificationType.Warning:
        return <WarningIcon className={classes.warningIcon}/>;
      case AppNotificationType.Error:
        return <ErrorIcon className={classes.errorIcon}/>;
    }
  };

  return (
    <List>
      {notifications.map(notification => (
        <ListItem key={notification.created.getTime()}>
          <ListItemIcon>
            {renderIcon(notification.type)}
          </ListItemIcon>
          <ListItemText
            primary={highlightText(notification.text, highlightedText)}
            secondary={dateFormatter(notification.created)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
