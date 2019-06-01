import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: 480,
  },
  // todo: move to theme
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
  },
  contentBlock: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
