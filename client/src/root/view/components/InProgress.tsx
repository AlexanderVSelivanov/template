import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import {Theme, Typography} from '@material-ui/core';
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
    fontSize: theme.spacing(2),
  },
  text: {
    fontSize: theme.spacing(2),
  },
}));

const InProgress: React.FC<{ text?: string }> = React.memo(({text = 'Loading...'}) => {
  const classes = useStyles();
  return (
    <span className={classes.root}>
      <CircularProgress className={classes.icon}/>
      {text && <Typography variant="caption" className={classes.text}>{text}</Typography>}
    </span>
  );
});

export default InProgress;
