import React from 'react';
import {storiesOf} from '@storybook/react';
import {withTheme} from 'root/view/theme';
import {Empty, setSuccessProperty} from 'template-common';
import {
  getUsersAction,
  getUserByIdAction,
  createUserAction,
  updateUserByIdAction,
  deleteUserByIdAction,
  setUpdatedUserEmptyAction,
} from '../../modules/user/actions';
import ActionMock from '../ActionMock';
import {userEntityDto1, userEntityDto2} from '../testData';

import UserPage from 'modules/user/view/pages/main/page';

storiesOf('Pages - User', module)
  .add(
    'User page',
    () => withTheme(
      <UserPage
        users={setSuccessProperty({count: 1, items: [userEntityDto1, userEntityDto2]})}
        user={setSuccessProperty(userEntityDto1)}
        createdUser={Empty}
        updatedUser={Empty}
        deletedUser={Empty}
        getUsers={() => ActionMock(getUsersAction.request({skip: 0, take: 20}))}
        getUserById={() => ActionMock(getUserByIdAction.request({id: 1}))}
        createUser={() => ActionMock(createUserAction.request(userEntityDto1))}
        updateUserById={() => ActionMock(updateUserByIdAction.request(userEntityDto1))}
        deleteUserById={() => ActionMock(deleteUserByIdAction.request({id: 1}))}
        setUpdateUserEmpty={() => ActionMock(setUpdatedUserEmptyAction())}
      />,
    ),
  )
;
