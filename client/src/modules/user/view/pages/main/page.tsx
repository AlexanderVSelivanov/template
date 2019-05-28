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
        User list and edit form
      </>
    );
  };

export default Page;
