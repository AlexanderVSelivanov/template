import React from 'react';
import {storiesOf} from '@storybook/react';
import {withTheme} from 'root/view/theme';
import withRouter from './withRouter';
import DialogLayout from 'root/view/layouts/dialog';
import PublicLayout from 'root/view/layouts/public';
import PrivateLayout from 'root/view/layouts/private';
import ActionMock from './ActionMock';
import {logoutAction} from '../modules/account/actions';
import {appNotification} from './testData';

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
      withRouter(
        <PrivateLayout
          logout={() => ActionMock(logoutAction.request())}
          notifications={[appNotification]}
          newNotificationsFrom={new Date(0)}
        >
          Private layout
        </PrivateLayout>,
      ),
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
