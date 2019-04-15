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
});

export default styles;
