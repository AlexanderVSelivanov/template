import {RequestHandler} from 'express';
import {ResponseStatus} from 'template-common';

export type AuthorizationRules = {};

const authorizationDecorator =
  (rules: AuthorizationRules | null, callback: RequestHandler): RequestHandler => (req, res, next) => {
    if (!req.auth) {
      res.status(ResponseStatus.Unauthorized);
      return;
    }
    callback(req, res, next);
  };

export default authorizationDecorator;
