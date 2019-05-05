import {createStyles, Theme} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
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
});

export default styles;
