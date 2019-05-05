import React from 'react';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'src/root/view/theme';
import {LoginPageComponent} from 'src/modules/account/view/pages/login';
import LoadingPage from 'src/root/view/pages/loading';
import {loginAction} from 'src/modules/account/actions';
import ActionMock from 'src/stories/ActionMock';

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
