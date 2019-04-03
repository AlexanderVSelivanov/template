import React from 'react';
import {WithStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

import styles from './styles';
import {DialogProps} from '@material-ui/core/es/Dialog';

type DialogLayoutProps = WithStyles<typeof styles> & React.ComponentType<DialogProps> & {
  children: React.ReactNode | React.ReactNodeArray,
  open: boolean
}

const DialogLayout: React.FC<DialogLayoutProps> = ({children, open, classes, ...other }) => {
  return (
    <Dialog
      open={open}
      {...other}
    >
      {children}
    </Dialog>
  );
};

export default DialogLayout;
