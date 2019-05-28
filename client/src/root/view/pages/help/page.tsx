import React from 'react';

import useStyles from './styles';
import Typography from '@material-ui/core/Typography';

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3">template</Typography>
      <p>Application template</p>
    </>
  );
};

export default Page;
