import React from 'react';
import {EmptyOr, isEmpty, isSuccessProperty, AsyncProperty, AccountDto} from 'template-common';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import dateFormatter from 'utils/formatters/dateFormatter';

type PageProps = {
  account: EmptyOr<AsyncProperty<AccountDto>>,
};

const Page: React.FC<PageProps> = ({account}) => {
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
            <TableCell align="right">{dateFormatter(account.value.entity!.created)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Updated</TableCell>
            <TableCell align="right">{dateFormatter(account.value.entity!.updated)}</TableCell>
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
