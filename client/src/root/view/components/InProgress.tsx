import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const InProgress: React.FC<{ text?: string }> = React.memo(({text = 'Loading...'}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.icon}/>
      {text}
    </div>
  );
});

export default InProgress;
