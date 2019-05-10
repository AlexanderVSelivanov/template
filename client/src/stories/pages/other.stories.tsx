import React from 'react';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'root/view/theme';
import {LoginPageComponent} from 'modules/account/view/pages/login';
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
      <LoginPageComponent
        error={null}
        login={payload => ActionMock(loginAction.request(payload))}
      />,
    ),
  );
