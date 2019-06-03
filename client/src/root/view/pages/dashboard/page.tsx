import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useStyles from './styles';
import {
  EmptyOr,
  AsyncProperty,
  EntityList,
  UserEntityDto,
  NoteEntityDto,
  isEmpty,
  isRequestProperty, isSuccessProperty,
} from 'template-common';
import {
  Button, IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {RouteComponentProps, withRouter} from 'react-router';
import routes from '../../../routes';
import EmptyPagePlaceholder from '../../components/EmptyPagePlaceholder';
import {AppNotification} from '../../../../types/AppNotification';
import {getUsersAction} from '../../../../modules/user/actions';
import {getNotesAction} from '../../../../modules/notebook/actions';
import NotificationList from '../../components/NotificationList';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const ITEMS_ON_DASHBOARD = 10;

type DashboardWidgetProps = {
  title: string,
  page: number,
  itemsPerPage: number,
  count: number,
  countAll: number,
  handleNavigateBefore: () => void,
  handleNavigateNext: () => void,
  showAllCallback?: () => void,
};

const DashboardWidget: React.FC<DashboardWidgetProps> =
  ({
     title,
     page,
     itemsPerPage,
     count,
     countAll,
     handleNavigateBefore,
     handleNavigateNext,
     showAllCallback,
     children,
   }) => {
    const classes = useStyles();
    return (
      <Paper className={classes.widget}>
        <Toolbar className={classes.widgetToolbar}>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <span className={classes.grow}/>
          {
            countAll > 0 && (
              <div className={classes.widgetToolbarPagination}>
                <IconButton
                  edge="end"
                  aria-label="Before"
                  onClick={handleNavigateBefore}
                  disabled={page === 0}
                >
                  <NavigateBeforeIcon/>
                </IconButton>
                <Typography>
                  {page * itemsPerPage + 1}-{page * itemsPerPage + count} of {countAll}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="Next"
                  onClick={handleNavigateNext}
                  disabled={page * itemsPerPage + count >= countAll}
                >
                  <NavigateNextIcon/>
                </IconButton>
              </div>
            )
          }
          <span className={classes.grow}/>
          {
            showAllCallback && (
              <Button
                className={classes.widgetToolbarButton}
                onClick={showAllCallback}
                size="small"
              >
                Show all
              </Button>
            )
          }
        </Toolbar>
        {children}
      </Paper>
    );
  };

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
        title="Notifications"
        page={notificationsPage}
        itemsPerPage={notificationsPerPage}
        count={notificationList.length}
        countAll={notifications.length}
        handleNavigateBefore={() => setNotesPage(notificationsPage - 1)}
        handleNavigateNext={() => setNotesPage(notificationsPage + 1)}
        showAllCallback={() => history.push(routes.settingsNotifications.path)}
      >
        <NotificationList notifications={notificationList}/>
      </DashboardWidget>
      <DashboardWidget
        title="Users"
        page={usersPage}
        itemsPerPage={usersPerPage}
        count={!isEmpty(users) && isSuccessProperty(users) ? users.value.items.length : 0}
        countAll={!isEmpty(users) && isSuccessProperty(users) ? users.value.count : 0}
        handleNavigateBefore={() => setUsersPage(usersPage - 1)}
        handleNavigateNext={() => setUsersPage(usersPage + 1)}
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
      </DashboardWidget>;
      <DashboardWidget
        title="Notes"
        page={notesPage}
        itemsPerPage={notesPerPage}
        count={!isEmpty(notes) && isSuccessProperty(notes) ? notes.value.items.length : 0}
        countAll={!isEmpty(notes) && isSuccessProperty(notes) ? notes.value.count : 0}
        handleNavigateBefore={() => setNotesPage(notesPage - 1)}
        handleNavigateNext={() => setNotesPage(notesPage + 1)}
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
      </DashboardWidget>;
      <DashboardWidget
        title="Events"
        page={0}
        itemsPerPage={0}
        count={0}
        countAll={0}
        handleNavigateBefore={() => {/* todo */
        }}
        handleNavigateNext={() => {/* todo */
        }}
        showAllCallback={() => history.push(routes.calendar.path)}
      >
        <EmptyPagePlaceholder text="Under construction"/>
      </DashboardWidget>;
    </div>
  )
    ;
};

export default withRouter(Page);
