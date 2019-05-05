import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {ApplicationError, UserEntity} from 'template-common';

import {withTheme} from './theme';
import PublicLayout from './layouts/public';
import LoadingPage from './pages/loading';
import LoginPage from 'src/modules/account/view/pages/login';
import PrivateLayout from 'src/root/view/layouts/private';

import routes from 'src/root/routes';
import documentTitleService from 'src/services/documentTitleService';

type RootProps = {
  isApplicationInitialized: boolean,
  accountUser: UserEntity | null,
  error: ApplicationError | null,
};

const Root: React.FC<RootProps> =
  ({
     isApplicationInitialized,
     accountUser,
     error,
   }) => {
    if (!isApplicationInitialized) {
      return withTheme(<LoadingPage/>);
    }

    if (!accountUser) {
      return withTheme(<PublicLayout><LoginPage/></PublicLayout>);
    }

    return withTheme(
      <BrowserRouter>
        <PrivateLayout>
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
