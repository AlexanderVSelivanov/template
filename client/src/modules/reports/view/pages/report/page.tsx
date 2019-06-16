import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {FormControl, MenuItem, Select, Toolbar} from '@material-ui/core';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import routes from 'root/routes';
import EmptyPagePlaceholder from 'root/view/components/EmptyPagePlaceholder';
import NotebookTableReport from '../../blocks/notebookTableReport';
import NotificationBarReport from '../../blocks/notificationBarReport';
import NotificationDoughnutReport from '../../blocks/notificationDoughnutReport';
import NotificationTableReport from '../../blocks/notificationTableReport';

import useStyles from './styles';

enum ReportEntity {
  Empty,
  Notifications = 'notifications',
  Notes = 'notes',
}

enum ReportType {
  Empty,
  Table = 'table',
  Bar = 'bar',
  Doughnut = 'doughnut',
}

type PageProps = RouteComponentProps & {};

const Page: React.FC<PageProps> = ({history, location}) => {
  const classes = useStyles();
  const locationReportEntity = useMemo(() => {
    if (location.pathname.includes(ReportEntity.Notifications)) {
      return ReportEntity.Notifications;
    }
    if (location.pathname.includes(ReportEntity.Notes)) {
      return ReportEntity.Notes;
    }
    return ReportEntity.Empty;
  }, [location]);
  const locationReportType = useMemo(() => {
    if (location.pathname.includes(ReportType.Table)) {
      return ReportType.Table;
    }
    if (location.pathname.includes(ReportType.Bar)) {
      return ReportType.Bar;
    }
    if (location.pathname.includes(ReportType.Doughnut)) {
      return ReportType.Doughnut;
    }
    return ReportType.Empty;
  }, [location]);

  const [reportEntity, setReportEntity] = useState(locationReportEntity);
  const [reportType, setReportType] = useState(locationReportType);

  useEffect(() => {
    if (reportEntity === ReportEntity.Empty || reportType === ReportType.Empty) {
      setReportEntity(ReportEntity.Notifications);
      setReportType(ReportType.Table);
    }
    if (reportEntity === ReportEntity.Notes && reportType !== ReportType.Table) {
      setReportType(ReportType.Table);
    }
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
          path={`${routes.reports.path}/:entity/:type`}
          render={
            (props: RouteComponentProps<{ entity: string, type: string }>) => {
              const entity = props.match.params.entity;
              const type = props.match.params.type;
              if (entity === ReportEntity.Notifications) {
                if (type === ReportType.Table) {
                  return <NotificationTableReport/>;
                }
                if (type === ReportType.Doughnut) {
                  return <NotificationDoughnutReport/>;
                }
                if (type === ReportType.Bar) {
                  return <NotificationBarReport/>;
                }
              }
              if (entity === ReportEntity.Notes) {
                return <NotebookTableReport/>;
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
