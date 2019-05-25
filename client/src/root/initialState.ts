import {ApplicationError, EmptyOr, Empty} from 'template-common';

export default {
  isApplicationInitialized: false,
  error: Empty as EmptyOr<ApplicationError>,
};
