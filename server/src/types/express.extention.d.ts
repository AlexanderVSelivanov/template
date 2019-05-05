import {Id} from 'template-common';

declare global {
  namespace Express {
    // tslint:disable-next-line
    export interface Request {
      auth: undefined | { userId: Id };
    }
  }
}
