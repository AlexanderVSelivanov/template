import React from 'react';
import {WithStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import styles from './styles';
import DialogActions from '@material-ui/core/DialogActions';

type DialogLayoutProps = WithStyles<typeof styles> & {
  open: boolean,
  title?: string,
  actions?: React.ReactNode | React.ReactNodeArray,
  children: React.ReactNode | React.ReactNodeArray,
};

const DialogLayout: React.FC<DialogLayoutProps> = ({children, open, title, actions, classes, ...other}) => {
  return (
    <Dialog open={open} {...other}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default DialogLayout;
