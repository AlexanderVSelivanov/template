import {createStyles, Theme} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
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
    padding: theme.spacing.unit * 3,
  },

});

export default styles;
