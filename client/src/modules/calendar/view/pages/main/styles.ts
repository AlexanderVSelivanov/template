import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minWidth: 600,
    minHeight: 480,
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  todayButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(12),
  },
}));

export default useStyles;
