import React from 'react';

import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

type PublicLayoutProps = {
  children: React.ReactNode | React.ReactNodeArray,
};

const PublicLayout: React.FC<PublicLayoutProps> = ({children}) => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Paper className={classes.content}>
        {children}
      </Paper>
    </main>
  );
};

export default PublicLayout;
