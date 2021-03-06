import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'gray',
  },
  content: {
    display: 'flex',
    minHeight: 300,
    minWidth: 480,
    padding: theme.spacing(2),
  },
}));

export default useStyles;
