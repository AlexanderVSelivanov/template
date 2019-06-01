import React, {useState} from 'react';

import useStyles from './styles';
import {Fab, Tabs, Tab, AppBar, Button, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const classes = useStyles();
  const [showEditEventDialog, setShowEditEventDialog] = useState(false);
  const [value, setValue] = React.useState(0);

  function handleChange(event: unknown, newValue: number) {
    setValue(newValue);
  }

  const handleOpenCreateEventDialog = () => {
    setShowEditEventDialog(true);
  };
  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Agenda"/>
        <Tab label="Day"/>
        <Tab label="Week"/>
        <Tab label="Month"/>
        <Tab label="Year"/>
      </Tabs>

      <Fab className={classes.todayButton} variant="extended">
        Today
      </Fab>

      <Fab className={classes.addButton} color="primary" onClick={handleOpenCreateEventDialog}>
        <AddIcon/>
      </Fab>

    </div>
  );
};

export default Page;
