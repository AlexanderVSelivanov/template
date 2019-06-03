import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {amber, green} from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    minWidth: 250,
  },
  informationIcon: {
    color: theme.palette.primary.dark,
  },
  successIcon: {
    color: green[600],
  },
  warningIcon: {
    color: amber[700],
  },
  errorIcon: {
    color: theme.palette.error.dark,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default useStyles;
