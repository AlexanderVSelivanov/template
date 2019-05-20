import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';

import RouterDescription from '../../types/RouterDescription';

import onServerErrorHandler from './onServerErrorHandler';
import onServerListeningHandler from './onServerListeningHandler';
import serverErrorLoggerMiddleware from './serverErrorLoggerMiddleware';
import serverRequestLoggerMiddleware from './serverRequestLoggerMiddleware';

const expressServer = express();
expressServer.use(cors());
expressServer.use(serverErrorLoggerMiddleware);
expressServer.use(express.json());
expressServer.use(serverRequestLoggerMiddleware);

const server = http.createServer(expressServer);
server.on('error', onServerErrorHandler);
server.on('listening', onServerListeningHandler);

const setupServerRoutes = (routers: RouterDescription[]) => {
  routers.forEach(({path, router}) => {
    expressServer.use(path, router);
  });
  return server;
};

export default setupServerRoutes;
