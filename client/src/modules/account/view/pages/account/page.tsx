import React, {useState} from 'react';
import useStyles from './styles';
import {EmptyOr, isEmpty, isSuccessProperty, AsyncProperty, AccountEntityDto} from 'template-common';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

type PageProps = {
  account: EmptyOr<AsyncProperty<AccountEntityDto>>,
};

const Page: React.FC<PageProps> = ({account}) => {
  const classes = useStyles();
  if (isEmpty(account)) {
    return <></>;
  }
  if (isSuccessProperty(account)) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">{account.value.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created</TableCell>
            <TableCell align="right">{new Date(account.value.created).toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Updated</TableCell>
            <TableCell align="right">{new Date(account.value.updated).toLocaleString()}</TableCell>
          </TableRow>
          {
            account.value.user
            && <>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">{account.value.user.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell align="right">{account.value.user.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">{account.value.user.email}</TableCell>
              </TableRow>
            </>
          }
        </TableBody>
      </Table>
    );
  }
  return <>Account not loaded</>;
};

export default Page;
