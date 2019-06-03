import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    minWidth: 250,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default useStyles;
