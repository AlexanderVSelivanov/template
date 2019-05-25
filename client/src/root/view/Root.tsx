import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {EmptyOr, ApplicationError, UserEntityDto} from 'template-common';

import {withTheme} from './theme';
import documentTitleService from 'services/documentTitleService';
import {logoutAction} from 'modules/account/actions';
import PublicLayout from './layouts/public';
import LoadingPage from './pages/loading';
import LoginPage from 'modules/account/view/pages/login';
import PrivateLayout from 'root/view/layouts/private';

import routes from 'root/routes';

type RootProps = {
  isApplicationInitialized: boolean,
  accountUser: EmptyOr<UserEntityDto>,
  error: EmptyOr<ApplicationError>,
  logout: typeof logoutAction.request,
};

const Root: React.FC<RootProps> =
  ({
     isApplicationInitialized,
     accountUser,
     logout,
     error,
   }) => {
    if (!isApplicationInitialized) {
      return withTheme(<PublicLayout><LoadingPage/></PublicLayout>);
    }

    if (!accountUser) {
      return withTheme(<PublicLayout><LoginPage/></PublicLayout>);
    }

    return withTheme(
      <BrowserRouter>
        <PrivateLayout logout={logout}>
          <Switch>
            {
              Object.values(routes)
                .map(route => <Route
                  key={route.path}
                  path={route.path}
                  render={() => {
                    documentTitleService(route.title);
                    return React.createElement(route.component);
                  }}
                />)
            }
            <Redirect to={routes.dashboard.path}/>
          </Switch>
        </PrivateLayout>,
      </BrowserRouter>,
    );
  };

export default Root;
