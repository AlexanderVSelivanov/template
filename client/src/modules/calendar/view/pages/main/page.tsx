import React from 'react';

import useStyles from './styles';

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const classes = useStyles();
  return (
    <>
      Calendar
    </>
  );
};

export default Page;
