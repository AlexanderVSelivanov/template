import React from 'react';
import {IconButton, Theme, Typography} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&>*': {
      marginLeft: 5,
      marginRight: 5,
    },
  },
}));

type PaginationProps = {
  page: number,
  itemsPerPage: number,
  count: number,
  countAll: number,
  handleNavigateBefore: () => void,
  handleNavigateNext: () => void,
};

const Pagination: React.FC<PaginationProps> =
  ({
     page,
     itemsPerPage,
     count,
     countAll,
     handleNavigateBefore,
     handleNavigateNext,
   }) => {
    const classes = useStyles();
    if (!countAll) {
      return <></>;
    }
    return (
      <div className={classes.container}>
        <IconButton
          edge="end"
          aria-label="Before"
          onClick={handleNavigateBefore}
          disabled={page === 0}
        >
          <NavigateBeforeIcon/>
        </IconButton>
        <Typography>
          {page * itemsPerPage + 1}-{page * itemsPerPage + count} of {countAll}
        </Typography>
        <IconButton
          edge="end"
          aria-label="Next"
          onClick={handleNavigateNext}
          disabled={page * itemsPerPage + count >= countAll}
        >
          <NavigateNextIcon/>
        </IconButton>
      </div>
    );
  };

export default Pagination;
