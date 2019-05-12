import React from 'react';
import {WithStyles} from '@material-ui/core';

import styles from './styles';

type PageProps = WithStyles<typeof styles> & {};

const Page: React.FC<PageProps> = ({classes}) => {
  return (
    <>
      List of notes and rich text editor
    </>
  );
};

export default Page;
