import React from 'react';
import {storiesOf} from '@storybook/react';
import {linkTo} from '@storybook/addon-links';
import {withTheme} from 'root/view/theme';
import withRouter from '../withRouter';

import DashboardPage from 'root/view/pages/dashboard/page';
import HelpPage from 'root/view/pages/help/page';
import LoadingPage from 'root/view/pages/loading/page';
import SettingsPage from 'root/view/pages/settings/page';
import {setSuccessProperty} from 'template-common';
import {appNotification, noteEntityDto1, noteEntityDto2, userEntityDto1, userEntityDto2} from '../testData';
import ActionMock from '../ActionMock';
import {getNotesAction} from '../../modules/notebook/actions';
import {getUsersAction} from '../../modules/user/actions';

storiesOf('Pages - Other', module)
  .add(
    'Dashboard page',
    () => withTheme(
      <DashboardPage
        notifications={[appNotification]}
        users={setSuccessProperty({count: 1, items: [userEntityDto1, userEntityDto2]})}
        notes={setSuccessProperty({count: 1, items: [noteEntityDto1, noteEntityDto2]})}
        getUsers={() => ActionMock(getUsersAction.request({skip: 0, take: 20}))}
        getNotes={() => ActionMock(getNotesAction.request({skip: 0, take: 20}))}
      />,
    ),
  )
  .add(
    'Help page',
    () => withTheme(
      <HelpPage/>,
    ),
  )
  .add(
    'Loading page',
    () => withTheme(
      <LoadingPage/>,
    ),
  )
  .add(
    'Settings page',
    () => withTheme(
      withRouter(
        <SettingsPage/>,
      ),
    ),
  )
  .add(
    'Settings page -  Account',
    () => <button onClick={() => linkTo('Pages - Account', 'Account page')}>Open account page</button>,
  );
