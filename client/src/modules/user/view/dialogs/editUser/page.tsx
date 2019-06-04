import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  UserEntityDto,
  EmptyOr,
  Empty,
  isEmpty,
  AsyncProperty,
  isRequestProperty,
  isSuccessProperty, UserDto,
} from 'template-common';
import {
  createUserAction,
  getUserByIdAction,
  updateUserByIdAction,
  setUserEmptyAction,
  setCreatedUserEmptyAction,
  setUpdatedUserEmptyAction,
} from 'modules/user/actions';
import {
  Grid,
  IconButton,
  Toolbar,
  Button,
  AppBar,
  TextField,
  Typography,
  Dialog,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';
import {RouteComponentProps, withRouter} from 'react-router';
import EmptyPagePlaceholder from '../../../../../root/view/components/EmptyPagePlaceholder';
import InProgress from '../../../../../root/view/components/InProgress';

type PageProps = RouteComponentProps<{ id?: string }> & {
  user: EmptyOr<AsyncProperty<UserEntityDto>>,
  createdUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  updatedUser: EmptyOr<AsyncProperty<UserEntityDto>>,

  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,

  setUserEmpty: typeof setUserEmptyAction,
  setCreatedUserEmpty: typeof setCreatedUserEmptyAction,
  setUpdatedUserEmpty: typeof setUpdatedUserEmptyAction,
};

const Page: React.FC<PageProps> =
  ({
     history,
     match,
     user,
     createdUser,
     updatedUser,
     getUserById,
     createUser,
     updateUserById,
     setUserEmpty,
     setCreatedUserEmpty,
     setUpdatedUserEmpty,
   }) => {
    const classes = useStyles();
    const [userId, setUserId] = useState<EmptyOr<number>>(Empty);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      if (match.params.id) {
        const id = parseInt(match.params.id, 10);
        setUserId(id);
        getUserById({id});
      } else {
        setUserEmpty();
      }
      setCreatedUserEmpty();
      setUpdatedUserEmpty();
    }, []);

    useEffect(() => {
      if (userId && !isEmpty(user) && isSuccessProperty(user)) {
        setFirstName(user.value.firstName);
        setLastName(user.value.lastName);
        setEmail(user.value.email);
      }
    }, [user, userId]);

    useEffect(() => {
      if (userId) {
        if (!isEmpty(updatedUser) && isSuccessProperty(updatedUser)) {
          handleClose();
        }
      } else {
        if (!isEmpty(createdUser) && isSuccessProperty(createdUser)) {
          handleClose();
        }
      }
    }, [createdUser, updatedUser]);

    const isUserLoading = useMemo(
      () => userId && !isEmpty(user) && isRequestProperty(user),
      [userId, user],
    );
    const isUserUpdating = useMemo(
      () => !isEmpty(updatedUser) && isRequestProperty(updatedUser),
      [updatedUser],
    );
    const isUserCreating = useMemo(
      () => !isEmpty(createdUser) && isRequestProperty(createdUser),
      [createdUser],
    );

    const inProgress = isUserLoading || isUserUpdating || isUserCreating;

    const handleClose = () => {
      history.goBack();
    };

    const handleSave = () => {
      const userDto: UserDto = {
        firstName,
        lastName,
        email,
      };
      if (userId && !isEmpty(user) && isSuccessProperty(user)) {
        updateUserById({
          id: user.value.id,
          ...userDto,
        });
      } else {
        createUser(userDto);
      }
    };

    return (
      <Dialog
        fullScreen
        open
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {userId ? 'Edit user' : 'Create user'}
            </Typography>
            {
              isUserUpdating && <InProgress text="Saving..."/>
            }
            {
              isUserCreating && <InProgress text="Creating..."/>
            }
            <Button color="inherit" onClick={handleSave} disabled={inProgress}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {
          isUserLoading
            ? <EmptyPagePlaceholder text="User is loading..." inProgress/>
            : (
              <form className={classes.content}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      value={firstName}
                      onChange={event => setFirstName(event.target.value)}
                      disabled={inProgress}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      value={lastName}
                      onChange={event => setLastName(event.target.value)}
                      disabled={inProgress}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      disabled={inProgress}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            )
        }
      </Dialog>
    );
  };

export default withRouter(Page);
