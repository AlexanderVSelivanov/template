import React, {useEffect, useState} from 'react';
import {EntityList, UserEntityDto, EmptyOr, AsyncProperty, EditAsyncProperty} from 'template-common';
import {
  createUserAction,
  deleteUserByIdAction,
  getUserByIdAction,
  getUsersAction,
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
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogLayout from '../../../../../root/view/layouts/dialog';
import useStyles from './styles';

type PageProps = {
  users: EmptyOr<AsyncProperty<EntityList<UserEntityDto>>>,
  editUser: EmptyOr<EditAsyncProperty<UserEntityDto>>,
  getUsers: typeof getUsersAction.request,
  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,
  deleteUserById: typeof deleteUserByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     users,
     editUser,
     getUsers,
     getUserById,
     createUser,
     updateUserById,
     deleteUserById,
   }) => {
    const classes = useStyles();
    const [showEditUserDialog, setShowEditUserDialog] = useState(false);
    useEffect(() => {
      getUsers({skip: 0, take: 25});
    }, []);

    const handleOpenCreateUserDialog = () => {
      setShowEditUserDialog(true);
    };
    const handleCreateUser = () => {

    };

    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell>Smith</TableCell>
              <TableCell align="right">test@mail.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell>Smith</TableCell>
              <TableCell align="right">test@mail.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell>Smith</TableCell>
              <TableCell align="right">test@mail.com</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>

          </TableFooter>
        </Table>


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
