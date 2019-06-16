import React from 'react';
import {AppNotification, appNotificationTypeToString} from 'types/AppNotification';
import useStyles from './styles';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import dateFormatter from 'utils/formatters/dateFormatter';

type BlockProps = {
  notifications: AppNotification[],
};

const Block: React.FC<BlockProps> = ({notifications}) => {
  const classes = useStyles();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Text</TableCell>
          <TableCell>Type</TableCell>
          <TableCell align="right">Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          notifications.map(notification => (
            <TableRow key={notification.created.getTime()} hover>
              <TableCell>{notification.text}</TableCell>
              <TableCell>{appNotificationTypeToString(notification.type)}</TableCell>
              <TableCell align="right">{dateFormatter(notification.created)}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default Block;
