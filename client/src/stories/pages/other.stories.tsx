import React from 'react';
import {storiesOf} from '@storybook/react';
import {linkTo} from '@storybook/addon-links';
import {withTheme} from 'root/view/theme';
import withRouter from '../withRouter';

import DashboardPage from 'root/view/pages/dashboard/page';
import HelpPage from 'root/view/pages/help/page';
import LoadingPage from 'root/view/pages/loading/page';
import SettingsPage from 'root/view/pages/settings/page';

storiesOf('Pages - Other', module)
  .add(
    'Dashboard page',
    () => withTheme(
      <DashboardPage/>,
    ),
  )
  .add(
    'Help page',
    () => withTheme(
      <HelpPage/>,
    ),
  )
  .add(
    'Loading page',
    () => withTheme(
      <LoadingPage/>,
    ),
  )
  .add(
    'Settings page',
    () => withTheme(
      withRouter(
        <SettingsPage/>,
      ),
    ),
  )
  .add(
    'Settings page -  Account',
    () => <button onClick={linkTo('Pages - Account', 'Account page')}>Open account page</button>,
  );
