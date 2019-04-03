import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'src/ui/theme';
import PasswordTextField from 'src/ui/components/inputs/PasswordTextField';

storiesOf('Components', module)
  .add('PasswordTextField',
    () => withTheme(
      <PasswordTextField
        password="password"
        onPasswordChange={password => action(`onPasswordChange: ${password}`)}
      />,
    ),
  );
