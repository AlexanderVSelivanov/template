import {NextFunction, Request, Response} from 'express';
import logger from '../loggerService';

const serverErrorLoggerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Server error: ${err}`);
  next();
};

export default serverErrorLoggerMiddleware;
