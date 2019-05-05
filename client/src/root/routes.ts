import {createRoute} from 'src/types/Route';

import DashboardPage from './view/pages/dashboard';
import RichTextEditorPage from 'src/modules/richTextEditor/view/pages/main';
import CalendarPage from 'src/modules/calendar/view/pages/main';
import TablePage from 'src/modules/table/view/pages/main';
import FormPage from 'src/modules/form/view/pages/main';
import MapPage from 'src/modules/map/view/pages/main';
import ReportsPage from 'src/modules/reports/view/pages/main';
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
