import React, {useCallback, useEffect, useState} from 'react';
import {
  UserEntityDto,
  EmptyOr,
  AsyncProperty,
  isEmpty,
  isRequestProperty,
  isSuccessProperty,
} from 'template-common';
import {
  createUserAction,
  getUserByIdAction,
  updateUserByIdAction,
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
import InProgress from 'root/view/components/InProgress';
import {RouteComponentProps, withRouter} from 'react-router';

type PageProps = RouteComponentProps & {
  user: EmptyOr<AsyncProperty<UserEntityDto>>,
  createdUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  updatedUser: EmptyOr<AsyncProperty<UserEntityDto>>,

  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     history,
     user,
     createdUser,
     updatedUser,
     getUserById,
     createUser,
     updateUserById,
   }) => {
    const classes = useStyles();

    const handleClose = () => {
      history.goBack();
    };

    return (
      <>
        {
          !isEmpty(user) && isRequestProperty(user) && <InProgress text="User is loading..."/>
        }

        <Dialog
          fullScreen
          open={true}
          title=""
          // actions={
          //   <>
          //     <Button color="primary" onClick={handleCreateUser}>Create</Button>
          //     <Button color="secondary" onClick={() => setShowEditUserDialog(false)}>Cancel</Button>
          //   </>
          // }
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Create new user
              </Typography>
              <Button color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  // value={}
                  // onChange={event => set(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>

                <TextField
                  label="Last Name"
                  // value={}
                  // onChange={event => set(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  // value={}
                  // onChange={event => set(event.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </Dialog>
      </>
    );
  };

export default withRouter(Page);
