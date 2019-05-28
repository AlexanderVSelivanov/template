import {createStyles, Theme} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
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
});

export default styles;
