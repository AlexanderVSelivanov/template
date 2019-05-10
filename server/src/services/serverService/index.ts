import * as http from 'http';
import * as express from 'express';

import RouterDescription from '../../types/RouterDescription';

import onServerErrorHandler from './onServerErrorHandler';
import onServerListeningHandler from './onServerListeningHandler';
import serverErrorLoggerMiddleware from './serverErrorLoggerMiddleware';
import serverRequestLoggerMiddleware from './serverRequestLoggerMiddleware';
import serverAuthorizationMiddleware from './serverAuthorizationMiddleware';

const expressServer = express();
expressServer.use(serverErrorLoggerMiddleware);
expressServer.use(express.json());
expressServer.use(serverRequestLoggerMiddleware);
expressServer.use(serverAuthorizationMiddleware);

const server = http.createServer(expressServer);
server.on('error', onServerErrorHandler);
server.on('listening', onServerListeningHandler);

const setupServerRoutes = (routers: RouterDescription[])=> {
  routers.forEach(({path, router}) => {
    expressServer.use(path, router);
  });
  return server;
};

export default setupServerRoutes;

export {default as authorizationDecorator} from './authorizationDecorator';
