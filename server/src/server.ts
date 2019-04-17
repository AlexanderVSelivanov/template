import * as http from 'http';
import * as express from 'express';

import {PORT} from './config';
import logger from './services/loggerService';

import routers from './routers';

const expressServer = express();
expressServer.use(express.json());

routers.forEach(({path, router}) => {
  expressServer.use(path, router);
});

const server = http.createServer(expressServer);
server.on('error', onServerError);
server.on('listening', onServerListening);

function onServerError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onServerListening() {
  const bind = typeof PORT === 'string' ? 'pipe ' + PORT : 'port ' + PORT;
  logger.info('Listening on ' + bind);
}

export default server;
