import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'stretch',
  },
  widget: {
    flexGrow: 1,
    minWidth: 350,
    minHeight: 400,
    maxHeight: 600,
    padding: 10,
    margin: 10,
    overflow: 'auto',
  },
  widgetToolbar: {
    padding: 0,
    minHeight: theme.spacing(5),
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary.light,
    borderBottomStyle: 'solid',
  },
  widgetToolbarPagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&>*': {
      marginLeft: 5,
      marginRight: 5,
    },
  },
  widgetToolbarButton: {},
  grow: {
    flexGrow: 1,
  },
}));

export default useStyles;
