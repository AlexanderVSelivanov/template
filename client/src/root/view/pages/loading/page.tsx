import React from 'react';
import {WithStyles} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

type LoadingPageProps = WithStyles<typeof styles> & {
  text?: string,
};

const LoadingPage: React.FC<LoadingPageProps> = ({text = 'Loading...', classes}) => {
  return (
    <>
      <CircularProgress/>
      {text}
    </>
  );
};

export default LoadingPage;
