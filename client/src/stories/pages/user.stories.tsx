import React from 'react';
import {storiesOf} from '@storybook/react';
import {withTheme} from 'root/view/theme';
import {Empty, setSuccessProperty} from 'template-common';
import {
  getUsersAction,
  getUserByIdAction,
  activateUserByIdAction,
  disableUserByIdAction,
} from '../../modules/user/actions';
import ActionMock from '../ActionMock';
import {userEntityDto1, userEntityDto2} from '../testData';

import UserPage from 'modules/user/view/pages/user/page';

storiesOf('Pages - User', module)
  .add(
    'User page',
    () => withTheme(
      <UserPage
        users={setSuccessProperty({count: 1, items: [userEntityDto1, userEntityDto2]})}
        user={setSuccessProperty(userEntityDto1)}
        activatedUser={Empty}
        disabledUser={Empty}
        getUsers={() => ActionMock(getUsersAction.request({skip: 0, take: 20}))}
        getUserById={() => ActionMock(getUserByIdAction.request({id: 1}))}
        activateUserById={() => ActionMock(activateUserByIdAction.request({id: 1}))}
        disableUserById={() => ActionMock(disableUserByIdAction.request({id: 1}))}
      />,
    ),
  )
;
