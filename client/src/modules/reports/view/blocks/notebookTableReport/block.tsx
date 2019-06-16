import React, {useCallback, useEffect, useState} from 'react';

import useStyles from './styles';
import {
  AsyncProperty,
  EmptyOr,
  EntityList,
  isEmpty,
  isRequestProperty,
  isSuccessProperty,
  NoteDto,
} from 'template-common';
import {getNotesAction} from 'modules/notebook/actions';
import EmptyPagePlaceholder from 'root/view/components/EmptyPagePlaceholder';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import dateFormatter from 'utils/formatters/dateFormatter';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

type BlockProps = {
  notes: EmptyOr<AsyncProperty<EntityList<NoteDto>>>,
  getNotes: typeof getNotesAction.request,
};

const Block: React.FC<BlockProps> = ({notes, getNotes}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const reloadNotes = useCallback(() => {
    getNotes({skip: page * itemsPerPage, take: itemsPerPage});
  }, [page, itemsPerPage]);

  useEffect(() => {
    reloadNotes();
  }, []);
  useEffect(() => {
    reloadNotes();
  }, [page, itemsPerPage]);

  if (!isEmpty(notes) && isRequestProperty(notes)) {
    return <EmptyPagePlaceholder text="Notes are loading..." inProgress/>;
  }

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

  if (!isEmpty(notes) && isSuccessProperty(notes)) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            notes.value.items.map(note => (
              <TableRow key={note.entity!.id} hover>
                <TableCell>{note.title}</TableCell>
                <TableCell>{note.tags}</TableCell>
                <TableCell align="right">{dateFormatter(note.entity!.created)}</TableCell>
                <TableCell align="right">{dateFormatter(note.entity!.updated)}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              colSpan={4}
              count={notes.value.count}
              rowsPerPage={itemsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  return <></>;
};

export default Block;

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
