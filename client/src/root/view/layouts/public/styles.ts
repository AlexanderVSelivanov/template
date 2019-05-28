import {createStyles, Theme} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
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
});

export default styles;
