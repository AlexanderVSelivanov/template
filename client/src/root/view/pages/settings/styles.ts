import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minWidth: 600,
    minHeight: 480,
  },
}));

export default useStyles;
