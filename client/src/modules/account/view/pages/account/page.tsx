import React from 'react';
import {EmptyOr, isEmpty, isSuccessProperty, AsyncProperty, AccountDto} from 'template-common';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Toolbar} from '@material-ui/core';
import dateFormatter from 'utils/formatters/dateFormatter';
import routes from '../../../../../root/routes';
import {RouteComponentProps, withRouter} from 'react-router';

type PageProps = RouteComponentProps & {
  account: EmptyOr<AsyncProperty<AccountDto>>,
};

const Page: React.FC<PageProps> = ({history, account}) => {
  if (isEmpty(account)) {
    return <></>;
  }
  if (isSuccessProperty(account)) {
    const handleEditUserClick = () => {
      history.push(routes.userEdit.path.replace(':id', account.value.user!.entity!.id.toString()));
    };
    return (
      <>
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
        <Toolbar>
          <Button
            color="primary"
            onClick={handleEditUserClick}
          >
            Edit
          </Button>
        </Toolbar>
      </>
    );
  }
  return <>Account not loaded</>;
};

export default withRouter(Page);
