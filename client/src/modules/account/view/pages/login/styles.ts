import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 480,
  },
  title: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'right',
  },
  error: {
    textAlign: 'center',
    color: theme.palette.error.main,
    fontWeight: 500,
  },
}));

export default useStyles;
