import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

type LoadingPageProps = {
  text?: string,
};

const LoadingPage: React.FC<LoadingPageProps> = ({text = 'Loading...'}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.icon}/>
      {text}
    </div>
  );
};

export default LoadingPage;
