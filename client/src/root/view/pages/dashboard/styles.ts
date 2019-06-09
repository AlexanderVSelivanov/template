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
  reportWidgetContainer: {
    position: 'relative',
    width: '80vw',
    margin: '0 auto',
  },
}));

export default useStyles;
