import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

type LoadingPageProps = {
  text?: string,
};

const LoadingPage: React.FC<LoadingPageProps> = ({text = 'Loading...'}) => {
  return (
    <>
      <CircularProgress/>
      {text}
    </>
  );
};

export default LoadingPage;
