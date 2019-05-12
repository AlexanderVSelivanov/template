import {createRoute} from 'types/Route';

import DashboardPage from './view/pages/dashboard';
import Notes from 'modules/notes/view/pages/main';
import CalendarPage from 'modules/calendar/view/pages/main';
import UserPage from 'modules/user/view/pages/main';
import MapPage from 'modules/map/view/pages/main';
import ReportsPage from 'modules/reports/view/pages/main';
import SettingsPage from './view/pages/settings';
import HelpPage from './view/pages/help';

const routes = {
  dashboard: createRoute('Dashboard', 'dashboard', DashboardPage),
  calendar: createRoute('Calendar', 'calendar', CalendarPage),
  notes: createRoute('Notes', 'notes', Notes),
  user: createRoute('User', 'user', UserPage),
  map: createRoute('Map', 'map', MapPage),
  reports: createRoute('Report', 'report', ReportsPage),
  settings: createRoute('Settings', 'settings', SettingsPage),
  help: createRoute('Help', 'help', HelpPage),

  // account: createRoute('Account', 'account'),
};

export default routes;
