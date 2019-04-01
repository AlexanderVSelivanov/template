import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'src/ui/theme';
import LoginPage from 'src/ui/pages/login';
import LoadingPage from 'src/ui/pages/loading';

storiesOf('Pages', module)
  .add(
    'Loading page',
    () => withTheme(
      <LoadingPage/>
    )
  )
  .add(
    'Login page',
    () => withTheme(
      <LoginPage
        onSubmit={action('onSubmit')}
      />
    )
  );
