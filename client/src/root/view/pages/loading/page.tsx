import React from 'react';
import {WithStyles} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

type LoadingPageProps = WithStyles<typeof styles> & {
  text?: string,
};

const LoadingPage: React.FC<LoadingPageProps> = ({text = 'Loading...', classes}) => {
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.icon}/>
      {text}
    </div>
  );
};

export default LoadingPage;
