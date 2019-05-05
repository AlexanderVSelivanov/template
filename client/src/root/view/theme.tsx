import React from 'react';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {MuiThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import './styles.css';

declare module '@material-ui/core/styles/createMuiTheme' {
  // tslint:disable-next-line
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'],
    };
  }
  // tslint:disable-next-line
  interface ThemeOptions {
    appDrawer: {
      width: React.CSSProperties['width'],
    };
  }
}

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  appDrawer: {
    width: 240,
  },
});

export const withTheme = (children: React.ReactNode | React.ReactNodeArray) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default theme;
