import React from 'react';

import {IconButton, Snackbar, SnackbarContent, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {POPUP_MESSAGE_TIMEOUT} from '../../../config';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  messageIcon: {
    fontSize: 20,
    backgroundColor: theme.palette.error.dark,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  closeIcon: {
    fontSize: 20,
  },
}));

type NotificationSnackbarProps = {
  text: string,
  open: boolean,
  onClose: () => void,
};

const ErrorNotificationSnackbar: React.FC<NotificationSnackbarProps> = React.memo(({text, open, onClose}) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      open={open}
      autoHideDuration={POPUP_MESSAGE_TIMEOUT}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes.content}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.messageIcon}/>
            {text}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.closeIcon}/>
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
});

export default ErrorNotificationSnackbar;
