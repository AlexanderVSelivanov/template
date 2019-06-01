import React from 'react';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';

import {EmptyOr, ApplicationError, AccountEntityDto} from 'template-common';

import {withTheme} from './theme';
import {logoutAction} from 'modules/account/actions';
import PublicLayout from './layouts/public';
import LoadingPage from './pages/loading';
import LoginPage from 'modules/account/view/pages/login';
import PrivateLayout from 'root/view/layouts/private';

import routes, {renderRoute} from 'root/routes';

type RootProps = {
  isApplicationInitialized: boolean,
  account: EmptyOr<AccountEntityDto>,
  error: EmptyOr<ApplicationError>,
  logout: typeof logoutAction.request,
};

const Root: React.FC<RootProps> =
  ({
     isApplicationInitialized,
     account,
     logout,
     error,
   }) => {
    if (!isApplicationInitialized) {
      return withTheme(<PublicLayout><LoadingPage/></PublicLayout>);
    }

    if (!account) {
      return withTheme(<PublicLayout><LoginPage/></PublicLayout>);
    }

    return withTheme(
      <BrowserRouter>
        <PrivateLayout logout={logout}>
          <Switch>
            {Object.values(routes).map(renderRoute)}
            <Redirect to={routes.dashboard.path}/>
          </Switch>
        </PrivateLayout>,
      </BrowserRouter>,
    );
  };

export default Root;
