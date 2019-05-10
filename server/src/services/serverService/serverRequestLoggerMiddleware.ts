import {NextFunction, Request, Response} from 'express';
import logger from '../loggerService';

const serverRequestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
  next();
};

export default serverRequestLoggerMiddleware;
