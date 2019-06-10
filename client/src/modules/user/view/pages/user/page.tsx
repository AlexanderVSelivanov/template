import React, {useCallback, useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {useTheme} from '@material-ui/core/styles';
import {
  Empty,
  EmptyOr,
  isEmpty,
  EntityList,
  UserDto,
  AsyncProperty,
  isRequestProperty,
  isSuccessProperty,
} from 'template-common';
import {
  activateUserByIdAction,
  disableUserByIdAction,
  getUserByIdAction,
  getUsersAction,
} from 'modules/user/actions';
import {
  Button,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography, Toolbar, Tooltip,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import InProgress from 'root/view/components/InProgress';
import UserDetailsDialog from '../../dialogs/userDetails';
import routes from 'root/routes';
import dateFormatter from 'utils/formatters/dateFormatter';

type PageProps = RouteComponentProps<{ id?: string }> & {
  users: EmptyOr<AsyncProperty<EntityList<UserDto>>>,
  user: EmptyOr<AsyncProperty<UserDto>>,
  activatedUser: EmptyOr<AsyncProperty<UserDto>>,
  disabledUser: EmptyOr<AsyncProperty<UserDto>>,

  getUsers: typeof getUsersAction.request,
  getUserById: typeof getUserByIdAction.request,
  activateUserById: typeof activateUserByIdAction.request,
  disableUserById: typeof disableUserByIdAction.request,
};

const Page: React.FC<PageProps> =
  ({
     history,
     users,
     activatedUser,
     disabledUser,
     getUsers,
     activateUserById,
     disableUserById,
   }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [search, setSearch] = useState('');
    const [disableToggleInProgressUserId, setDisableToggleInProgressUserId] = useState<EmptyOr<number>>(Empty);

    const reloadUsers = useCallback(() => {
      getUsers({skip: page * itemsPerPage, take: itemsPerPage, search});
    }, [page, itemsPerPage, search]);

    useEffect(() => {
      reloadUsers();
    }, []);

    useEffect(() => {
      reloadUsers();
    }, [page, itemsPerPage, search]);

    useEffect(() => {
      const userWasActivated = !isEmpty(activatedUser) && isSuccessProperty(activatedUser);
      const userWasDisabled = !isEmpty(disabledUser) && isSuccessProperty(disabledUser);
      if (userWasActivated || userWasDisabled) {
        reloadUsers();
        setDisableToggleInProgressUserId(Empty);
      }
    }, [activatedUser, disabledUser]);

    const handleCreateUser = () => {
      history.push(routes.userCreate.path);
    };
    const handleEditUser = ({entity}: UserDto) => {
      history.push(routes.userEdit.path.replace(':id', entity!.id.toString()));
    };
    const handleShowUserDetails = ({entity}: UserDto) => {
      history.push(routes.userDetails.path.replace(':id', entity!.id.toString()));
    };
    const handleToggleUserActiveFlag = ({entity, disable}: UserDto) => {
      if (disable) {
        activateUserById({id: entity!.id});
      } else {
        disableUserById({id: entity!.id});
      }
    };

    function handleChangePage(
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number,
    ) {
      setPage(newPage);
    }

    function handleChangeRowsPerPage(
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      setItemsPerPage(parseInt(event.target.value, 10));
    }

    return (
      <>
        <Toolbar>
          <TextField
            placeholder="Search..."
            className={classes.search}
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </Toolbar>
        {
          isEmpty(users) && <Typography>There aren't any users yet.</Typography>
        }
        {
          !isEmpty(users) && isRequestProperty(users) && <InProgress text="Users are loading..."/>
        }
        {
          !isEmpty(users) && isSuccessProperty(users) && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">Updated</TableCell>
                  <TableCell align="right">Active</TableCell>
                  <TableCell align="right"/>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  users.value.items.map(userItem => (
                    <TableRow key={userItem.entity!.id} hover onClick={() => handleShowUserDetails(userItem)}>
                      <TableCell>{userItem.firstName}</TableCell>
                      <TableCell>{userItem.lastName}</TableCell>
                      <TableCell align="right">{userItem.email}</TableCell>
                      <TableCell align="right">{dateFormatter(userItem.entity!.created)}</TableCell>
                      <TableCell align="right">{dateFormatter(userItem.entity!.updated)}</TableCell>
                      <TableCell align="right">
                        {
                          !isEmpty(disableToggleInProgressUserId)
                          && disableToggleInProgressUserId === userItem.entity!.id
                            ? <InProgress text="Updating..."/>
                            : (
                              <Tooltip title={userItem.disable ? 'Activate' : 'Deactivate'}>
                                <Button
                                  size="small"
                                  onClick={
                                    event => {
                                      event.stopPropagation();
                                      handleToggleUserActiveFlag(userItem);
                                    }
                                  }
                                >
                                  {userItem.disable ? 'disabled' : 'active'}
                                </Button>
                              </Tooltip>
                            )
                        }
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit user">
                          <IconButton
                            size="small"
                            aria-label="Edit"
                            onClick={
                              event => {
                                event.stopPropagation();
                                handleEditUser(userItem);
                              }
                            }
                          >
                            <EditIcon/>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={7}
                    count={users.value.items.length}
                    rowsPerPage={itemsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          )
        }

        <Fab className={classes.addButton} color="primary" onClick={handleCreateUser}>
          <AddIcon/>
        </Fab>

        <UserDetailsDialog/>
      </>
    );
  };

export default withRouter(Page);

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const {count, page, rowsPerPage, onChangePage} = props;

  function handleFirstPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div
      className={classes.tablePaginationRoot}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
      </IconButton>
    </div>
  );
}
