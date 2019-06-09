import React, {useEffect} from 'react';
import {
  UserEntityDto,
  EmptyOr,
  AsyncProperty,
  isEmpty,
  isRequestProperty,
  isSuccessProperty,
} from 'template-common';
import {getUserByIdAction} from 'modules/user/actions';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core';
import DialogLayout from 'root/view/layouts/dialog';
import useStyles from './styles';
import {RouteComponentProps, withRouter} from 'react-router';
import routes from 'root/routes';
import EmptyPagePlaceholder from 'root/view/components/EmptyPagePlaceholder';
import dateFormatter from 'utils/formatters/dateFormatter';

type DialogProps = RouteComponentProps<{ id: string }> & {
  user: EmptyOr<AsyncProperty<UserEntityDto>>,
  getUserById: typeof getUserByIdAction.request,
};

const Dialog: React.FC<DialogProps> =
  ({
     user,
     getUserById,
     match,
     history,
   }) => {
    const classes = useStyles();

    useEffect(() => {
      if (match.params.id) {
        const id = parseInt(match.params.id, 10);
        getUserById({id});
      }
    }, []);

    return (
      <DialogLayout
        fullWidth
        open={Boolean(match.params.id)}
        title="User details"
        actions={
          <>
            {
              !isEmpty(user) && isSuccessProperty(user)
              && <Button
                color="primary"
                onClick={() => history.push(routes.userEdit.path.replace(':id', user.value.id.toString()))}
              >
                Edit
              </Button>
            }
            <Button color="secondary" onClick={() => history.goBack()}>Close</Button>
          </>
        }
      >
        {
          !isEmpty(user) && isRequestProperty(user) && <EmptyPagePlaceholder text="User is loading..." inProgress/>
        }
        {
          !isEmpty(user) && isSuccessProperty(user)
          && <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">{user.value.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell align="right">{user.value.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">{user.value.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created</TableCell>
                <TableCell align="right">{dateFormatter(user.value.created)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated</TableCell>
                <TableCell align="right">{dateFormatter(user.value.updated)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Active</TableCell>
                <TableCell align="right">{user.value.disable ? 'disable' : 'active'}</TableCell>
              </TableRow>
              {
                user.value.account && [
                  <>
                    <TableRow>
                      <TableCell align="center" colSpan={2}><Typography variant="h6">Account</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell align="right">{user.value.account.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created</TableCell>
                      <TableCell align="right">{dateFormatter(user.value.account.created)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Updated</TableCell>
                      <TableCell align="right">{dateFormatter(user.value.account.updated)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Active</TableCell>
                      <TableCell align="right">{user.value.account.disable ? 'disable' : 'active'}</TableCell>
                    </TableRow>
                  </>,
                ]
              }
            </TableBody>
          </Table>
        }
      </DialogLayout>
    );
  };

export default withRouter(Dialog);
