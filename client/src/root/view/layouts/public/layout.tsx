import React from 'react';

import Paper from '@material-ui/core/Paper';
import {WithStyles} from '@material-ui/core';
import styles from './styles';

type PublicLayoutProps = WithStyles<typeof styles> & {
  children: React.ReactNode | React.ReactNodeArray,
};

const PublicLayout: React.FC<PublicLayoutProps> = ({children, classes}) => {
  return (
    <main className={classes.root}>
      <Paper className={classes.content}>
        {children}
      </Paper>
    </main>
  );
};

export default PublicLayout;
