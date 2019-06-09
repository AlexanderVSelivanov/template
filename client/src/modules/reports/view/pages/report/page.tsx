import React, {ChangeEvent, useEffect, useState} from 'react';

import useStyles from './styles';
import {FormControl, MenuItem, Select, Toolbar} from '@material-ui/core';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import routes from '../../../../../root/routes';
import EmptyPagePlaceholder from '../../../../../root/view/components/EmptyPagePlaceholder';

enum ReportEntity {
  Notifications = 'notifications',
  Notes = 'notes',
  Events = 'events',
}

enum ReportType {
  Table = 'table',
  Bar = 'bar',
  Doughnut = 'doughnut',
}

type PageProps = RouteComponentProps & {};

const Page: React.FC<PageProps> = ({history}) => {
  const classes = useStyles();
  const [reportEntity, setReportEntity] = useState(ReportEntity.Notifications);
  const [reportType, setReportType] = useState(ReportType.Table);

  useEffect(() => {
    history.push(`${routes.reports.path}/${reportEntity}/${reportType}`);
  }, [reportEntity, reportType]);

  function handleReportEntityChange(event: ChangeEvent<{ name?: string, value: unknown }>) {
    setReportEntity(event.target.value as ReportEntity);
  }

  function handleReportTypeChange(event: ChangeEvent<{ name?: string, value: unknown }>) {
    setReportType(event.target.value as ReportType);
  }

  return (
    <>
      <Toolbar>
        <FormControl>
          <Select
            className={classes.select}
            value={reportEntity}
            onChange={handleReportEntityChange}
            placeholder="Report Entity"
          >
            <MenuItem value={ReportEntity.Notifications}>Notifications</MenuItem>
            <MenuItem value={ReportEntity.Notes}>Notes</MenuItem>
            <MenuItem value={ReportEntity.Events}>Events</MenuItem>
          </Select>
        </FormControl>
        <span className={classes.grow}/>
        <FormControl>
          <Select
            className={classes.select}
            value={reportType}
            onChange={handleReportTypeChange}
            placeholder="Report Entity"
          >
            <MenuItem value={ReportType.Table}>Table</MenuItem>
            {
              reportEntity === ReportEntity.Notifications && [
                (<MenuItem key={ReportType.Bar} value={ReportType.Bar}>Bar</MenuItem>),
                (<MenuItem key={ReportType.Doughnut} value={ReportType.Doughnut}>Doughnut</MenuItem>),
              ]
            }
          </Select>
        </FormControl>
      </Toolbar>

      <Switch>
        <Route
          path={`${routes.reports.path}/:entity/:path`}
          render={
            (props: RouteComponentProps<{ entity: string, type: string }>) => {
              const entity = props.match.params.entity;
              const type = props.match.params.type;
              if (entity === ReportEntity.Notifications) {
                if (type === ReportType.Table) {

                }
                if (type === ReportType.Doughnut) {

                }
                if (type === ReportType.Bar) {

                }
              }
              if (entity === ReportEntity.Notes) {

              }
              if (entity === ReportEntity.Events) {

              }
              return <EmptyPagePlaceholder text="Report under construction"/>;
            }
          }
        />
      </Switch>
    </>
  );
};

export default withRouter(Page);
