import React from 'react';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'],
    };
  }

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

export default theme;
