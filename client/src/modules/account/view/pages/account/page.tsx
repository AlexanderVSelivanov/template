import React, {useState} from 'react';
import useStyles from './styles';
import {EmptyOr, AccountEntityDto} from 'template-common';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

type PageProps = {
  account: EmptyOr<AccountEntityDto>,
};

const Page: React.FC<PageProps> = ({account}) => {
  const classes = useStyles();
  if (account) {
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
            <TableCell align="right">{account.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created</TableCell>
            <TableCell align="right">{new Date(account.created).toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Updated</TableCell>
            <TableCell align="right">{new Date(account.updated).toLocaleString()}</TableCell>
          </TableRow>
          {
            account.user
            && <>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">{account.user.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell align="right">{account.user.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">{account.user.email}</TableCell>
              </TableRow>
            </>
          }
        </TableBody>
      </Table>
    );
  }
  return <></>;
};

export default Page;
