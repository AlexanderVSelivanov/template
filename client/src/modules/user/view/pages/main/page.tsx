import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {
  EntityList,
  UserEntityDto,
  EmptyOr,
  AsyncProperty,
  isEmpty,
  isRequestProperty,
  isSuccessProperty,
} from 'template-common';
import {
  createUserAction,
  deleteUserByIdAction,
  getUserByIdAction,
  getUsersAction, setUpdatedUserEmptyAction,
  updateUserByIdAction,
} from 'modules/user/actions';
import {
  Button,
  Fab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography, Toolbar,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';
import DialogLayout from '../../../../../root/view/layouts/dialog';
import useStyles from './styles';
import InProgress from '../../../../../root/view/components/InProgress';

type PageProps = {
  users: EmptyOr<AsyncProperty<EntityList<UserEntityDto>>>,
  user: EmptyOr<AsyncProperty<UserEntityDto>>,
  createdUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  updatedUser: EmptyOr<AsyncProperty<UserEntityDto>>,
  deletedUser: EmptyOr<AsyncProperty<UserEntityDto>>,

  getUsers: typeof getUsersAction.request,
  getUserById: typeof getUserByIdAction.request,
  createUser: typeof createUserAction.request,
  updateUserById: typeof updateUserByIdAction.request,
  deleteUserById: typeof deleteUserByIdAction.request,
  setUpdateUserEmpty: typeof setUpdatedUserEmptyAction,
};

const Page: React.FC<PageProps> =
  ({
     users,
     user,
     createdUser,
     updatedUser,
     deletedUser,
     getUsers,
     getUserById,
     createUser,
     updateUserById,
     deleteUserById,
     setUpdateUserEmpty,
   }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [showEditUserDialog, setShowEditUserDialog] = useState(false);
    const [search, setSearch] = useState('');

    const reloadUsers = useCallback(() => {
      getUsers({skip: page * rowsPerPage, take: rowsPerPage});
    }, [page, rowsPerPage]);

    useEffect(() => {
      reloadUsers();
    }, []);

    const handleOpenCreateUserDialog = () => {
      setShowEditUserDialog(true);
    };
    const handleCreateUser = () => {

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
      setRowsPerPage(parseInt(event.target.value, 10));
    }

    return (
      <>
        {
          isEmpty(users) && <Typography>There aren't any users yet.</Typography>
        }
        {
          !isEmpty(users) && isRequestProperty(users) && <InProgress text="Users loading..."/>
        }
        {
          !isEmpty(users) && isSuccessProperty(users) && (
            <>
              <Toolbar>
                <TextField
                  placeholder="Search..."
                  className={classes.search}
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />

              </Toolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Updated</TableCell>
                    <TableCell align="right">Disable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    users.value.items.map(userItem => (
                      <TableRow key={userItem.id}>
                        <TableCell>{userItem.firstName}</TableCell>
                        <TableCell>{userItem.lastName}</TableCell>
                        <TableCell align="right">{userItem.email}</TableCell>
                        <TableCell align="right">{new Date(userItem.created).toLocaleString()}</TableCell>
                        <TableCell align="right">{new Date(userItem.updated).toLocaleString()}</TableCell>
                        <TableCell align="right">{userItem.disable ? 'disable' : 'active'}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={6}
                      count={users.value.items.length}
                      rowsPerPage={rowsPerPage}
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
            </>
          )
        }

        <Fab className={classes.addButton} color="primary" onClick={handleOpenCreateUserDialog}>
          <AddIcon/>
        </Fab>

        {/*todo: use route to add/edit user*/}
        <DialogLayout
          fullWidth
          open={showEditUserDialog}
          title="Create new user"
          actions={
            <>
              <Button color="primary" onClick={handleCreateUser}>Create</Button>
              <Button color="secondary" onClick={() => setShowEditUserDialog(false)}>Cancel</Button>
            </>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                // value={}
                // onChange={event => set(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>

              <TextField
                label="Last Name"
                // value={}
                // onChange={event => set(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                // value={}
                // onChange={event => set(event.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogLayout>
      </>
    );
  };

export default Page;

// const useStyles1 = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexShrink: 0,
//       color: theme.palette.text.secondary,
//       marginLeft: theme.spacing(2.5),
//     },
//   }),
// );

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  // const classes = useStyles1();
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
      // className={classes.root}
      style={{
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
      }}
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
