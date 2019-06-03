import React, {useEffect, useMemo, useState} from 'react';
import {Empty, EmptyOr, isEmpty} from 'template-common';
import useStyles from './styles';
import {setNewNotificationsFromAction} from '../../../actions';
import {AppNotification, AppNotificationPriority} from 'types/AppNotification';
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Switch,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import EmptyPagePlaceholder from '../../components/EmptyPagePlaceholder';

type PageProps = {
  notifications: AppNotification[],
  newNotificationsFrom: Date,
  setNewNotificationsFrom: typeof setNewNotificationsFromAction,
};

const Page: React.FC<PageProps> = ({notifications, newNotificationsFrom, setNewNotificationsFrom}) => {
  const classes = useStyles();
  const [newNotificationsFromOldValue, setNewNotificationsFromOldValue] = useState<EmptyOr<Date>>(Empty);
  const [showOnlyNew, setShowOnlyNew] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setNewNotificationsFromOldValue(newNotificationsFrom);
    setNewNotificationsFrom(new Date());
  }, []);
  const filteredNotifications = useMemo(() => {
    let result = notifications;
    if (showOnlyNew && !isEmpty(newNotificationsFromOldValue)) {
      result = result.filter(notification => notification.created > newNotificationsFromOldValue);
    }
    if (search) {
      result = result.filter(notification => notification.text.includes(search));
    }
    return result;
  }, [notifications, search, showOnlyNew, newNotificationsFromOldValue]);
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
  if (notifications.length === 0) {
    return <EmptyPagePlaceholder text="There aren't any notifications yet."/>;
  }

  function formatText(text: string) {
    if (search) {
      const textSplit = text.split(search);
      if (textSplit.length === 1) {
        return text;
      }
      return <span dangerouslySetInnerHTML={{__html: textSplit.join(`<strong>${search}</strong>`)}}/>;
    }
    return text;
  }

  return (
    <>
      <Toolbar>
        <TextField
          placeholder="Search..."
          className={classes.search}
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <span className={classes.grow}/>
        <FormControlLabel
          control={
            <Switch
              checked={showOnlyNew}
              onChange={() => setShowOnlyNew(!showOnlyNew)}
              color="primary"
            />
          }
          label="Only new"
          labelPlacement="start"
        />

      </Toolbar>
      <List>
        {filteredNotifications.map(notification => (
          <ListItem key={notification.created.toString()}>
            <ListItemIcon>
              {renderIcon(notification.priority)}
            </ListItemIcon>
            <ListItemText primary={formatText(notification.text)} secondary={notification.created.toLocaleString()}/>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Page;
