import React from 'react';
import {Button, Paper, Theme, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  widget: {
    flexGrow: 1,
    minWidth: 350,
    minHeight: 400,
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

type DashboardWidgetProps = {
  title: string,
  showAllCallback?: () => void,
  extraTitle?: React.ReactNode,
};

const DashboardWidget: React.FC<DashboardWidgetProps> =
  ({
     title,
     showAllCallback,
     extraTitle,
     children,
   }) => {
    const classes = useStyles();
    return (
      <Paper className={classes.widget}>
        <Toolbar className={classes.widgetToolbar}>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <span className={classes.grow}/>
          {extraTitle}
          <span className={classes.grow}/>
          {
            showAllCallback && (
              <Button
                className={classes.widgetToolbarButton}
                onClick={showAllCallback}
                size="small"
              >
                Show all
              </Button>
            )
          }
        </Toolbar>
        {children}
      </Paper>
    );
  };

export default DashboardWidget;
