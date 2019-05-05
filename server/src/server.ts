import * as http from 'http';
import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';

import {Token, TokenPayload} from 'template-common';

import {PORT, SECRET_KEY} from './config';
import logger from './services/loggerService';
import routers from './routers';

const expressServer = express();
expressServer.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Server error: ${err}`);
  next();
});
expressServer.use(express.json());
expressServer.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
  next();
});

expressServer.use((req: Request, res: Response, next: NextFunction) => {
  try {
    if (req && req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(' ');
      if (authorization.length > 0) {
        const token: Token = authorization[1];
        jwt.verify(token, SECRET_KEY, (error, payload) => {
          if (payload) {
            if (error) {
              logger.error(`Token verify error: ${error}`);
            } else {
              const tokenPayload = payload as TokenPayload;
              req.auth = {
                userId: tokenPayload.userId,
              };
            }
          }
        });
      }
    }
  } catch (error) {
    logger.error(`Token check error: ${error}`);
  }
  next();
});

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
