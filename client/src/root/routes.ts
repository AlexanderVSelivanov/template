import {createRoute} from 'types/Route';

import DashboardPage from './view/pages/dashboard';
import RichTextEditorPage from 'modules/richTextEditor/view/pages/main';
import CalendarPage from 'modules/calendar/view/pages/main';
import TablePage from 'modules/table/view/pages/main';
import FormPage from 'modules/form/view/pages/main';
import MapPage from 'modules/map/view/pages/main';
import ReportsPage from 'modules/reports/view/pages/main';
import SettingsPage from './view/pages/settings';
import HelpPage from './view/pages/help';

const routes = {
  dashboard: createRoute('Dashboard', 'dashboard', DashboardPage),
  richTextEditor: createRoute('Rich Text Editor', 'rich-text-editor', RichTextEditorPage),
  calendar: createRoute('Calendar', 'calendar', CalendarPage),
  table: createRoute('Table', 'table', TablePage),
  form: createRoute('Form', 'form', FormPage),
  map: createRoute('Map', 'map', MapPage),
  reports: createRoute('Report', 'report', ReportsPage),
  settings: createRoute('Settings', 'settings', SettingsPage),
  help: createRoute('Help', 'help', HelpPage),

  // account: createRoute('Account', 'account'),
};

export default routes;
