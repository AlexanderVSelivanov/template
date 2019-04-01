import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {withTheme} from "src/ui/theme";
import PublicLayout from "src/ui/layouts/public";
import LoadingPage from 'src/ui/pages/loading';
import LoginPage from 'src/ui/pages/login';

const Root: React.FC<{ isApplicationInitialized: boolean }> = ({isApplicationInitialized}) => {
  if (!isApplicationInitialized)
    return withTheme(<LoadingPage />);

  return withTheme(
    <BrowserRouter>
      <PublicLayout>
        <LoginPage
          onSubmit={((login, password) => console.log(`onSubmit ${login} ${password}`))}
        />
      </PublicLayout>
    </BrowserRouter>
  )
};

export default Root;
