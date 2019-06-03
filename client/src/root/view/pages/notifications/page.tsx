import React, {useEffect, useMemo, useState} from 'react';
import {Empty, EmptyOr, isEmpty} from 'template-common';
import useStyles from './styles';
import {setNewNotificationsFromAction} from '../../../actions';
import {AppNotification} from 'types/AppNotification';
import {
  FormControlLabel,
  Switch,
  TextField,
  Toolbar,
} from '@material-ui/core';
import NotificationList from '../../components/NotificationList';

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
      <NotificationList notifications={filteredNotifications} highlightedText={search}/>
    </>
  );
};

export default Page;
