import React, {useEffect, useMemo, useState} from 'react';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import {EmptyOr, isEmpty, AsyncProperty, ApplicationError, AccountEntityDto} from 'template-common';
import {withTheme} from './theme';
import {logoutAction} from 'modules/account/actions';
import PublicLayout from './layouts/public';
import LoadingPage from './pages/loading';
import LoginPage from 'modules/account/view/pages/login';
import PrivateLayout from 'root/view/layouts/private';
import routes, {renderRoute} from 'root/routes';
import ErrorNotificationSnackbar from './components/ErrorNotificationSnackbar';
import {AppNotification} from '../../types/AppNotification';

type RootProps = {
  isApplicationInitialized: boolean,
  account: EmptyOr<AsyncProperty<AccountEntityDto>>,
  logout: typeof logoutAction.request,
  notifications: AppNotification[],
  newNotificationsFrom: Date,
  error: EmptyOr<ApplicationError>,
};

const Root: React.FC<RootProps> =
  ({
     isApplicationInitialized,
     account,
     logout,
     notifications,
     newNotificationsFrom,
     error,
   }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    useEffect(() => {
      if (!isEmpty(error)) {
        setShowSnackbar(true);
      }
    }, [error]);
    const loading = useMemo(
      () => !isApplicationInitialized && <PublicLayout><LoadingPage/></PublicLayout>,
      [isApplicationInitialized],
    );
    const login = useMemo(
      () => isEmpty(account) && <PublicLayout><LoginPage/></PublicLayout>,
      [account],
    );
    const errorNotification = useMemo(
      () => (
        !isEmpty(error) && <ErrorNotificationSnackbar
          open={showSnackbar}
          text={error.message}
          onClose={() => setShowSnackbar(false)}
        />
      ),
      [error, showSnackbar],
    );
    const privateArea = useMemo(
      () => isApplicationInitialized && !isEmpty(account) && (
        <BrowserRouter>
          <PrivateLayout logout={logout} notifications={notifications} newNotificationsFrom={newNotificationsFrom}>
            <Switch>
              {Object.values(routes).map(renderRoute)}
              <Redirect to={routes.dashboard.path}/>
            </Switch>
          </PrivateLayout>
        </BrowserRouter>
      ),
      [isApplicationInitialized, account, notifications, newNotificationsFrom],
    );

    return withTheme(
      <>
        {loading}
        {login}
        {privateArea}
        {errorNotification}
      </>,
    );
  };

export default Root;
