import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {
  EntityList,
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
  getUsersAction,
  updateUserByIdAction,
  setUpdatedUserEmptyAction,
} from 'modules/user/actions';
import {
  Grid,
  TextField,
} from '@material-ui/core';
import DialogLayout from '../../../../../root/view/layouts/dialog';
import useStyles from './styles';
import InProgress from '../../../../../root/view/components/InProgress';

type PageProps = {
  user: EmptyOr<AsyncProperty<UserEntityDto>>,
  createdUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  updatedUser: EmptyOr<AsyncProperty<UserEntityDto>>,

  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     user,
     createdUser,
     updatedUser,
     getUserById,
     createUser,
     updateUserById,
   }) => {
    const classes = useStyles();

    return (
      <>
        {
          !isEmpty(user) && isRequestProperty(user) && <InProgress text="User is loading..."/>
        }

        <DialogLayout
          fullWidth
          open={true}
          title="Create new user"
          // actions={
          //   <>
          //     <Button color="primary" onClick={handleCreateUser}>Create</Button>
          //     <Button color="secondary" onClick={() => setShowEditUserDialog(false)}>Cancel</Button>
          //   </>
          // }
        >
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
        </DialogLayout>

      </>
    );
  };

export default Page;
