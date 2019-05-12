import AccountEntity from '../store/entities/AccountEntity';

declare global {
  namespace Express {
    // tslint:disable-next-line
    export interface Request {
      account: AccountEntity | undefined;
    }
  }
}
