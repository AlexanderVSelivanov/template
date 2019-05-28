import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  editor: {
    flexGrow: 1,
  },
  noteList: {
    maxWidth: 350,
    minWidth: 250,
    marginLeft: 25,
  },
}));

export default useStyles;
