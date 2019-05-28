import React from 'react';
import {storiesOf} from '@storybook/react';
import {Empty} from 'template-common';

import {withTheme} from 'root/view/theme';
import LoginPage from 'modules/account/view/pages/login/page';
import LoadingPage from 'root/view/pages/loading';
import {loginAction} from 'modules/account/actions';
import ActionMock from 'stories/ActionMock';

storiesOf('Pages', module)
  .add(
    'Loading page',
    () => withTheme(
      <LoadingPage/>,
    ),
  )
  .add(
    'Login page',
    () => withTheme(
      <LoginPage
        error={Empty}
        login={payload => ActionMock(loginAction.request(payload))}
      />,
    ),
  );
