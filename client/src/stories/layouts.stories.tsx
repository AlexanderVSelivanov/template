import React from 'react';
import {storiesOf} from '@storybook/react';

import {withTheme} from 'root/view/theme';

import DialogLayout from 'root/view/layouts/dialog';
import PublicLayout from 'root/view/layouts/public';
import PrivateLayout from 'root/view/layouts/private';

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
