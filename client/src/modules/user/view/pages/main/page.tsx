import React, {useCallback, useEffect, useState} from 'react';
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
  deleteUserByIdAction,
  getUserByIdAction,
  getUsersAction, setUpdatedUserEmptyAction,
  updateUserByIdAction,
} from 'modules/user/actions';
import {
  Button,
  Fab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField, Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogLayout from '../../../../../root/view/layouts/dialog';
import useStyles from './styles';
import InProgress from '../../../../../root/view/components/InProgress';

type PageProps = {
  users: EmptyOr<AsyncProperty<EntityList<UserEntityDto>>>,
  user: EmptyOr<AsyncProperty<UserEntityDto>>,
  createdUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  updatedUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  deletedUser: EmptyOr<AsyncProperty<UserEntityDto>>,

  getUsers: typeof getUsersAction.request,
  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,
  deleteUserById: typeof deleteUserByIdAction.request,
  setUpdateUserEmpty: typeof setUpdatedUserEmptyAction,
};

const Page: React.FC<PageProps> =
  ({
     users,
     user,
     createdUser,
     updatedUser,
     deletedUser,
     getUsers,
     getUserById,
     createUser,
     updateUserById,
     deleteUserById,
     setUpdateUserEmpty,
   }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(20);
    const [showEditUserDialog, setShowEditUserDialog] = useState(false);

    const reloadUsers = useCallback(() => {
      getUsers({skip: page * usersPerPage, take: usersPerPage});
    }, [page, usersPerPage]);

    useEffect(() => {
      reloadUsers();
    }, []);

    const handleOpenCreateUserDialog = () => {
      setShowEditUserDialog(true);
    };
    const handleCreateUser = () => {

    };

    return (
      <>
        {
          isEmpty(users) && <Typography>There aren't any users yet.</Typography>
        }
        {
          !isEmpty(users) && isRequestProperty(users) && <InProgress text="Users loading..."/>
        }
        {
          !isEmpty(users) && isSuccessProperty(users) && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">Updated</TableCell>
                  <TableCell align="right">Disable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  users.value.items.map(userItem => (
                    <TableRow key={userItem.id}>
                      <TableCell>{userItem.firstName}</TableCell>
                      <TableCell>{userItem.lastName}</TableCell>
                      <TableCell align="right">{userItem.email}</TableCell>
                      <TableCell align="right">{new Date(userItem.created).toLocaleString()}</TableCell>
                      <TableCell align="right">{new Date(userItem.updated).toLocaleString()}</TableCell>
                      <TableCell align="right">{userItem.disable ? 'disable' : 'active'}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
              <TableFooter>

              </TableFooter>
            </Table>
          )
        }

        <Fab className={classes.addButton} color="primary" onClick={handleOpenCreateUserDialog}>
          <AddIcon/>
        </Fab>

        {/*todo: use route to add/edit user*/}
        <DialogLayout
          fullWidth
          open={showEditUserDialog}
          title="Create new user"
          actions={
            <>
              <Button color="primary" onClick={handleCreateUser}>Create</Button>
              <Button color="secondary" onClick={() => setShowEditUserDialog(false)}>Cancel</Button>
            </>
          }
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
