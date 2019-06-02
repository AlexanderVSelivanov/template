import React from 'react';
import {BrowserRouter} from 'react-router-dom';

const withRouter = (children: React.ReactNode | React.ReactNodeArray) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);
export default withRouter;
