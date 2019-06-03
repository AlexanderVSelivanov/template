import React from 'react';
import {storiesOf} from '@storybook/react';
import {Empty, setSuccessProperty} from 'template-common';
import {withTheme} from 'root/view/theme';
import {loginAction} from 'modules/account/actions';
import {accountEntityDto1} from '../testData';
import ActionMock from '../ActionMock';

import AccountPage from 'modules/account/view/pages/account/page';
import LoginPage from 'modules/account/view/pages/login/page';

storiesOf('Pages - Account', module)
  .add(
    'Account page',
    () => withTheme(
      <AccountPage
        account={setSuccessProperty(accountEntityDto1)}
      />,
    ),
  )
  .add(
    'Login page',
    () => withTheme(
      <LoginPage
        login={payload => ActionMock(loginAction.request(payload))}
        token={Empty}
        currentAccount={Empty}
      />,
    ),
  );
