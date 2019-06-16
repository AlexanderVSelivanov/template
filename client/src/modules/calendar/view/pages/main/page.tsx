import React, {useState} from 'react';

import useStyles from './styles';
import {Fab, Tabs, Tab, Button, Grid, TextField} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Redirect, RouteComponentProps, Switch, withRouter} from 'react-router';
import routes, {renderRoute} from 'root/routes';
import DialogLayout from '../../../../../root/view/layouts/dialog';
import {isEmpty, isSuccessProperty} from 'template-common';

type PageProps = RouteComponentProps & {};

const Page: React.FC<PageProps> = ({history, location}) => {
  const classes = useStyles();
  const [showEditEventDialog, setShowEditEventDialog] = useState(false);

  if (location.pathname === routes.calendar.path) {
    return <Redirect to={routes.calendar.subroutes!.agenda.path}/>;
  }

  const handleOpenCreateEventDialog = () => {
    setShowEditEventDialog(true);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={location.pathname}
        onChange={(event, value) => history.push(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Agenda" value={routes.calendar.subroutes!.agenda.path}/>
        <Tab label="Day" value={routes.calendar.subroutes!.day.path}/>
        <Tab label="Week" value={routes.calendar.subroutes!.week.path}/>
        <Tab label="Month" value={routes.calendar.subroutes!.month.path}/>
        <Tab label="Year" value={routes.calendar.subroutes!.year.path}/>
      </Tabs>

      <Switch>
        {renderRoute(routes.calendar.subroutes!.agenda)}
        {renderRoute(routes.calendar.subroutes!.day)}
        {renderRoute(routes.calendar.subroutes!.week)}
        {renderRoute(routes.calendar.subroutes!.month)}
        {renderRoute(routes.calendar.subroutes!.year)}
      </Switch>

      <Fab className={classes.todayButton} variant="extended">
        Today
      </Fab>

      <Fab className={classes.addButton} color="primary" onClick={handleOpenCreateEventDialog}>
        <AddIcon/>
      </Fab>

      <DialogLayout
        fullWidth
        open={showEditEventDialog}
        title="Add event"
        actions={
          <>
            {
              <Button
                color="primary"
              >
                Save
              </Button>
            }
            <Button color="secondary" onClick={() => setShowEditEventDialog(false)}>Close</Button>
          </>
        }
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                label="Text"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </DialogLayout>

    </div>
  );
};

export default withRouter(Page);
