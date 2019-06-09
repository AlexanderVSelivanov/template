import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Theme, Typography} from '@material-ui/core';
import InProgress from './InProgress';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      minHeight: 350,
    },
    text: {
      padding: 35,
      fontSize: theme.spacing(3),
    },
  }
));

const EmptyPagePlaceholder: React.FC<{ text: string, inProgress?: boolean }> =
  React.memo(({text, inProgress = false}) => {
    const classes = useStyles();
    return (
      <span className={classes.container}>
        <Typography className={classes.text} component="span">
          {inProgress ? <InProgress text={text}/> : text}
        </Typography>
      </span>
    );
  });

export default EmptyPagePlaceholder;
