import {PORT} from './config';
import {connect} from './store';
import routers from './routers';
import setupServer from './services/serverService';
import logger from './services/loggerService';

connect
  .then(connection => {
    logger.info('Database connected');
    const server = setupServer(routers);
    server.listen(PORT);
  })
  .catch(error => logger.error('Database connection error: ', error));
