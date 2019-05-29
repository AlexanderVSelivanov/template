import React, {useEffect} from 'react';

import {EntityList, UserEntityDto, EmptyOr, AsyncProperty, EditAsyncProperty} from 'template-common';
import {
  createUserAction,
  deleteUserByIdAction,
  getUserByIdAction,
  getUsersAction,
  updateUserByIdAction,
} from 'modules/user/actions';

import useStyles from './styles';
import {Table, TableBody, TableCell, TableFooter, TableHead, TableRow} from '@material-ui/core';

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
    useEffect(() => {
      getUsers({skip: 0, take: 25});
    }, []);
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
      </>
    );
  };

export default Page;
