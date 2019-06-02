import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'root/view/theme';
import PasswordTextField from 'root/view/components/inputs/PasswordTextField';
import InProgress from 'root/view/components/InProgress';

storiesOf('Components', module)
  .add('PasswordTextField',
    () => withTheme(
      <PasswordTextField
        password="password"
        onPasswordChange={action}
      />,
    ),
  )
  .add('InProgress',
    () => withTheme(
      <InProgress
        text="Something in progress..."
      />,
    ),
  );
