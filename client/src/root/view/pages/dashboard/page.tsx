import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useStyles from './styles';
import {
  AsyncProperty,
  EmptyOr,
  EntityList,
  isEmpty,
  isRequestProperty,
  isSuccessProperty,
  NoteEntityDto,
  UserEntityDto,
} from 'template-common';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {RouteComponentProps, withRouter} from 'react-router';

import {Bar, Doughnut} from 'react-chartjs-2';
import {
  AppNotification,
  isAppNotificationError,
  isAppNotificationInformation,
  isAppNotificationSuccess,
  isAppNotificationWarning,
} from 'types/AppNotification';
import {getUsersAction} from 'modules/user/actions';
import {getNotesAction} from 'modules/notebook/actions';
import NotificationList from '../../components/NotificationList';
import EmptyPagePlaceholder from '../../components/EmptyPagePlaceholder';
import routes from '../../../routes';
import DashboardWidget from '../../components/DashboardWidget';
import Pagination from '../../components/inputs/Pagination';

const ITEMS_ON_DASHBOARD = 10;

type PageProps = RouteComponentProps & {
  notifications: AppNotification[],
  users: EmptyOr<AsyncProperty<EntityList<UserEntityDto>>>,
  notes: EmptyOr<AsyncProperty<EntityList<NoteEntityDto>>>,
  getUsers: typeof getUsersAction.request,
  getNotes: typeof getNotesAction.request,
};

const Page: React.FC<PageProps> = ({history, notifications, users, notes, getUsers, getNotes}) => {
  const classes = useStyles();
  const [notificationsPage, setNotificationsPage] = useState(0);
  const [notificationsPerPage, setNotificationsPerPage] = useState(ITEMS_ON_DASHBOARD);
  const [usersPage, setUsersPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(ITEMS_ON_DASHBOARD);
  const [notesPage, setNotesPage] = useState(0);
  const [notesPerPage, setNotesPerPage] = useState(ITEMS_ON_DASHBOARD);

  const reloadUsers = useCallback(() => {
    getUsers({skip: usersPage * usersPerPage, take: usersPerPage});
  }, [usersPage, usersPerPage]);
  const reloadNotes = useCallback(() => {
    getNotes({skip: notesPage * notesPerPage, take: notesPerPage});
  }, [notesPage, notesPerPage]);
  const notificationList = useMemo(
    () => notifications.slice(notificationsPage * notificationsPerPage, notificationsPerPage),
    [notificationsPage, notificationsPerPage],
  );

  useEffect(() => {
    reloadNotes();
    reloadUsers();
  }, []);
  useEffect(() => {
    reloadUsers();
  }, [usersPage, usersPerPage]);
  useEffect(() => {
    reloadNotes();
  }, [notesPage, notesPerPage]);

  return (
    <div className={classes.root}>
      <DashboardWidget
        title="Users"
        extraTitle={
          <Pagination
            page={usersPage}
            itemsPerPage={usersPerPage}
            count={!isEmpty(users) && isSuccessProperty(users) ? users.value.items.length : 0}
            countAll={!isEmpty(users) && isSuccessProperty(users) ? users.value.count : 0}
            handleNavigateBefore={() => setUsersPage(usersPage - 1)}
            handleNavigateNext={() => setUsersPage(usersPage + 1)}
          />
        }
        showAllCallback={() => history.push(routes.user.path)}
      >
        {
          !isEmpty(users) && isRequestProperty(users) && <EmptyPagePlaceholder text="Users are loading..." inProgress/>
        }
        {
          !isEmpty(users) && isSuccessProperty(users) && (
            <List>
              {
                users.value.items.map(user => (
                    <ListItem key={user.id}>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={user.email}
                      />
                    </ListItem>
                  ),
                )
              }
            </List>
          )
        }
      </DashboardWidget>
      <DashboardWidget
        title="Notes"
        extraTitle={
          <Pagination
            page={notesPage}
            itemsPerPage={notesPerPage}
            count={!isEmpty(notes) && isSuccessProperty(notes) ? notes.value.items.length : 0}
            countAll={!isEmpty(notes) && isSuccessProperty(notes) ? notes.value.count : 0}
            handleNavigateBefore={() => setNotesPage(notesPage - 1)}
            handleNavigateNext={() => setNotesPage(notesPage + 1)}
          />
        }
        showAllCallback={() => history.push(routes.notebook.path)}
      >
        {
          !isEmpty(notes) && isRequestProperty(notes) && <EmptyPagePlaceholder text="Notes are loading..." inProgress/>
        }
        {
          !isEmpty(notes) && isSuccessProperty(notes) && (
            <List>
              {
                notes.value.items.map(note => (
                    <ListItem key={note.id}>
                      <ListItemText
                        primary={note.title}
                        secondary={note.tags && note.tags.join ? note.tags.join(', ') : note.tags}
                      />
                    </ListItem>
                  ),
                )
              }
            </List>
          )
        }
      </DashboardWidget>
      <DashboardWidget
        title="Events"
        showAllCallback={() => history.push(routes.calendar.path)}
      >
        <EmptyPagePlaceholder text="Under construction"/>
      </DashboardWidget>
      <DashboardWidget
        title="Notifications"
        extraTitle={
          <Pagination
            page={notificationsPage}
            itemsPerPage={notificationsPerPage}
            count={notificationList.length}
            countAll={notifications.length}
            handleNavigateBefore={() => setNotificationsPage(notificationsPage - 1)}
            handleNavigateNext={() => setNotificationsPage(notificationsPage + 1)}
          />
        }
        showAllCallback={() => history.push(routes.settings.subroutes!.notifications.path)}
      >
        <NotificationList notifications={notificationList}/>
      </DashboardWidget>
      <DashboardWidget
        title="Reports - Counts"
        showAllCallback={() => history.push(routes.reports.path)}
      >
        <div className={classes.reportWidgetContainer}>
          <Doughnut
            data={{
              labels: ['Notifications', 'User', 'Notes', 'Events'],
              datasets: [
                {
                  label: 'Count',
                  data: [
                    notifications.length,
                    !isEmpty(users) && isSuccessProperty(users) ? users.value.count : 0,
                    !isEmpty(notes) && isSuccessProperty(notes) ? notes.value.count : 0,
                    0,
                  ],
                  backgroundColor: [
                    'SEAGREEN',
                    'DARKBLUE',
                    'LIGHTSTEELBLUE',
                    'GOLD',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }}
          />
        </div>
      </DashboardWidget>
      <DashboardWidget
        title="Reports - Notifications"
        showAllCallback={() => history.push(routes.reports.path)}
      >
        <div className={classes.reportWidgetContainer}>
          <Bar
            data={{
              labels: ['Information', 'Success', 'Warning', 'Error'],
              datasets: [
                {
                  label: 'Count',
                  data: [
                    notifications
                      .filter(isAppNotificationInformation).length,
                    notifications
                      .filter(isAppNotificationSuccess).length,
                    notifications
                      .filter(isAppNotificationWarning).length,
                    notifications
                      .filter(isAppNotificationError).length,
                  ],
                  backgroundColor: [
                    'rgba(0,0,255,0.5)',
                    'rgba(0,255,0,0.5)',
                    'rgba(255,255,0,0.5)',
                    'rgba(255,0,0,0.5)',
                  ],
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: 'Notifications',
              },
              responsive: true,
              legend: {
                position: 'bottom',
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                  },
                }],
              },
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }}
          />
        </div>
      </DashboardWidget>
    </div>
  )
    ;
};

export default withRouter(Page);
