import React from 'react';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'src/root/view/theme';

import DialogLayout from 'src/root/view/layouts/dialog';
import PublicLayout from 'src/root/view/layouts/public';
import PrivateLayout from 'src/root/view/layouts/private';

storiesOf('Layouts', module)
  .add(
    'Dialog',
    () => withTheme(
      <DialogLayout title="Dialog layout" open>
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
