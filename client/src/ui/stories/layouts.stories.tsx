import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'src/ui/theme';

import DialogLayout from 'src/ui/layouts/dialog';
import PrivateLayout from 'src/ui/layouts/private';
import PublicLayout from 'src/ui/layouts/public';

storiesOf('Layouts', module)
  .add(
    'Dialog',
    () => withTheme(
      <DialogLayout
        open
      >
        Dialog layout
      </DialogLayout>,
    ),
  )
  .add(
    'Private',
    () => withTheme(
      <PrivateLayout>
        Private layout
      </PrivateLayout>,
    ),
  )
  .add(
    'Public',
    () => withTheme(
      <PublicLayout>
        Public layout
      </PublicLayout>,
    ),
  );
