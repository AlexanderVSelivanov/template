import {Request, Response, RequestHandler} from 'express';
import * as jwt from 'jsonwebtoken';
import {get} from 'lodash';
import {ResponseStatus, TokenDto, TokenPayloadDto} from 'template-common';

import {SECRET_KEY} from '../../config';
import accountRepositoryFactory from '../../store/repository/accountRepository';
import {NextFunction} from 'express-serve-static-core';
import {VerifyErrors} from 'jsonwebtoken';

export type AuthorizationRules = {};

const parseToken = (request: Request): TokenDto | null => {
  if (!request.headers || !request.headers.authorization) {
    return null;
  }
  const authorization = request.headers.authorization.split(' ');
  if (authorization.length < 2) {
    return null;
  }
  return authorization[1];
};

const verifyToken = async (token: TokenDto): Promise<{ jwtVerifyError: VerifyErrors, tokenPayload: TokenPayloadDto }> =>
  new Promise(
    resolve => jwt.verify(
      token,
      SECRET_KEY,
      (err, decoded) => resolve({jwtVerifyError: err, tokenPayload: decoded as TokenPayloadDto}),
    ),
  );

const authorizationMiddleware = (rules?: AuthorizationRules): RequestHandler =>
  async (request: Request, respond: Response, next: NextFunction) => {
    try {
      const token = parseToken(request);
      if (token) {
        const {jwtVerifyError, tokenPayload} = await verifyToken(token);
        if (jwtVerifyError || !tokenPayload) {
          respond
            .status(ResponseStatus.Unauthorized)
            .send(get(jwtVerifyError, 'message', ''));
        } else {
          const accountRepository = accountRepositoryFactory();
          request.account = await accountRepository.findOne(tokenPayload.accountId, {relations: ['user']});
          if (request.account) {
            next();
          } else {
            respond.sendStatus(ResponseStatus.Unauthorized);
          }
        }
      } else {
        respond.sendStatus(ResponseStatus.Unauthorized);
      }
    } catch (error) {
      next(error);
    }
  };

export default authorizationMiddleware;
