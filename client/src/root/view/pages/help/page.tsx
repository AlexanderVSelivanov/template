import React from 'react';
import {WithStyles} from '@material-ui/core';

import styles from './styles';
import Typography from '@material-ui/core/Typography';

type PageProps = WithStyles<typeof styles> & {};

const Page: React.FC<PageProps> = ({classes}) => {
  return (
    <>
      <Typography variant="h3">template</Typography>
      <p>Application template</p>
    </>
  );
};

export default Page;
