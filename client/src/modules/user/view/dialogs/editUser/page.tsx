import React, {useEffect, useMemo, useState} from 'react';
import {
  UserDto,
  EmptyOr,
  Empty,
  isEmpty,
  AsyncProperty,
  isRequestProperty,
  isSuccessProperty,
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
  FormControlLabel,
  Switch,
  Checkbox,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';
import {RouteComponentProps, withRouter} from 'react-router';
import EmptyPagePlaceholder from 'root/view/components/EmptyPagePlaceholder';
import InProgress from 'root/view/components/InProgress';
import isValidEmail from 'utils/validation/isValidEmail';
import dateFormatter from 'utils/formatters/dateFormatter';

type UserDtoValidationKeys =
  keyof Omit<UserDto, 'id' | 'created' | 'updated' | 'disable' | 'account'> | 'username';

type PageProps = RouteComponentProps<{ id?: string }> & {
  user: EmptyOr<AsyncProperty<UserDto>>,
  createdUser: EmptyOr<AsyncProperty<UserDto>>,
  updatedUser: EmptyOr<AsyncProperty<UserDto>>,

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
    const [disable, setDisable] = useState(false);
    const [hasAccount, setHasAccount] = useState(false);
    const [username, setUsername] = useState('');

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
        setDisable(user.value.disable);
        if (user.value.account) {
          setHasAccount(true);
          setUsername(user.value.account.username);
        }
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

    const validation = useMemo(() => {
      const result = new Map<UserDtoValidationKeys, string>();
      if (!firstName.trim()) {
        result.set('firstName', 'First name required');
      }
      if (!lastName.trim()) {
        result.set('lastName', 'Last name required');
      }
      if (!isValidEmail(email)) {
        result.set('email', 'Invalid email');
      }
      if (hasAccount) {
        if (!username.trim()) {
          result.set('username', 'Username required');
        }
      }
      return result;
    }, [firstName, lastName, email]);
    const isValid = (key?: UserDtoValidationKeys) => {
      if (!key) {
        return validation.size === 0;
      }
      return !validation.has(key);
    };

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
        disable,
        // account: hasAccount ? {username, id: -1, disable: false} : undefined,
      };
      if (userId && !isEmpty(user) && isSuccessProperty(user)) {
        updateUserById({
          entity: user.value.entity,
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
            <Button color="inherit" onClick={handleSave} disabled={inProgress || !isValid()}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {
          isUserLoading
            ? <EmptyPagePlaceholder text="User is loading..." inProgress/>
            : (
              <form className={classes.content}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Grid container spacing={4}>

                      <Grid item xs={12}>
                        <TextField
                          label="First Name"
                          value={firstName}
                          onChange={event => setFirstName(event.target.value)}
                          disabled={inProgress}
                          error={!isValid('firstName')}
                          helperText={validation.get('firstName')}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Last Name"
                          value={lastName}
                          onChange={event => setLastName(event.target.value)}
                          disabled={inProgress}
                          error={!isValid('lastName')}
                          helperText={validation.get('lastName')}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          value={email}
                          onChange={event => setEmail(event.target.value)}
                          disabled={inProgress}
                          error={!isValid('email')}
                          helperText={validation.get('email')}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={disable}
                              onChange={() => setDisable(oldValue => !oldValue)}
                              color="primary"
                            />
                          }
                          label="Disable"
                          labelPlacement="start"
                        />
                      </Grid>

                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={4}>

                      {
                        userId && !isEmpty(user) && isSuccessProperty(user) && (
                          <>
                            <Grid item xs={12}>
                              <Typography>Created: {dateFormatter(user.value.entity!.created)}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>Updated: {dateFormatter(user.value.entity!.updated)}</Typography>
                            </Grid>
                          </>
                        )
                      }
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hasAccount}
                              onChange={() => setHasAccount(oldValue => !oldValue)}
                              color="primary"
                            />
                          }
                          label="Has account"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Username"
                          value={username}
                          onChange={event => setUsername(event.target.value)}
                          disabled={inProgress || !hasAccount}
                          error={!isValid('username')}
                          helperText={validation.get('username')}
                          fullWidth
                        />
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )
        }
      </Dialog>
    );
  };

export default withRouter(Page);
