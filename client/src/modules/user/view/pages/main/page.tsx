import React, {useEffect} from 'react';
import {WithStyles} from '@material-ui/core';

import {LoadProperty, NotLoaded} from 'types/LoadProperty';
import {EntityList, UserEntityDto} from 'template-common';
import {
  createUserAction,
  deleteUserByIdAction,
  getUserByIdAction,
  getUsersAction,
  updateUserByIdAction,
} from 'modules/user/actions';

import styles from './styles';

type PageProps = WithStyles<typeof styles> & {
  users: LoadProperty<EntityList<UserEntityDto>>,
  editUser: LoadProperty<UserEntityDto>,
  createdUser: LoadProperty<UserEntityDto>,
  deletedUser: LoadProperty<UserEntityDto>,

  getUsers: typeof getUsersAction.request,
  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,
  deleteUserById: typeof deleteUserByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     classes,
     users,
     editUser,
     createdUser,
     deletedUser,
     getUsers,
     getUserById,
     createUser,
     updateUserById,
     deleteUserById,
   }) => {
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
