import React from 'react';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import DialogActions from '@material-ui/core/DialogActions';

type DialogLayoutProps = DialogProps & {
  open: boolean,
  title?: string,
  actions?: React.ReactNode | React.ReactNodeArray,
  children: React.ReactNode | React.ReactNodeArray,
};

const DialogLayout: React.FC<DialogLayoutProps> = ({children, open, title, actions, ...other}) => {
  return (
    <Dialog open={open} {...other}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default DialogLayout;
