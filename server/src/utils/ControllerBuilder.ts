import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {get} from 'lodash';

import {SECRET_KEY} from '../config';

import AccountEntity from '../store/entities/AccountEntity';
import {ResponseStatus, TokenDto, TokenPayloadDto} from 'template-common';
import accountRepositoryFactory from '../store/repository/accountRepository';

export type ControllerOutput<T> = {
  status: ResponseStatus,
  message?: string,
  data?: T,
};

export const ok = <T>(data: T): ControllerOutput<T> => ({status: ResponseStatus.Ok, data});
export const notFound = (message?: string) => ({status: ResponseStatus.NotFound, message});
export const badRequest = (message?: string) => ({status: ResponseStatus.BadRequest, message});
export const internalServerError = (message?: string) => ({status: ResponseStatus.InternalServerError, message});

export type ControllerSetting = {
  authorize: boolean,
};

const defaultControllerSetting: ControllerSetting = {
  authorize: true,
};

export type Controller<In, Out> =
  (settings: { input: In, account?: AccountEntity }) => Promise<ControllerOutput<Out>>;

export default class ControllerBuilder<In, Out> {

  private readonly controller: Controller<In, Out>;
  private readonly settings: ControllerSetting;

  constructor(controller: Controller<In, Out>, settings: ControllerSetting = defaultControllerSetting) {
    this.controller = controller;
    this.settings = settings;
  }

  build = () => async (request: Request, respond: Response, next: NextFunction) => {
    try {
      const input = {...request.body, ...request.params, ...request.query} as In;
      if (this.settings.authorize) {
        const token = parseToken(request);
        if (token) {
          const {jwtVerifyError, tokenPayload} = await verifyToken(token);
          if (jwtVerifyError || !tokenPayload) {
            respond
              .status(ResponseStatus.Unauthorized)
              .send(get(jwtVerifyError, 'message', ''));
          } else {
            const accountRepository = accountRepositoryFactory();
            const account = await accountRepository.findOne(tokenPayload.accountId, {relations: ['user']});
            if (account) {
              const output = await this.controller({input, account});
              respond.status(output.status).send(output.data ? output.data : output.message);
            } else {
              respond.sendStatus(ResponseStatus.Unauthorized);
            }
          }
        } else {
          respond.sendStatus(ResponseStatus.Unauthorized);
        }
      } else {
        const output = await this.controller({input});
        respond.status(output.status).send(output.data ? output.data : output.message);
      }
    } catch (error) {
      next(error);
    }
  }
}

export const simplePublicController = <In, Out>(controller: Controller<In, Out>) => {
  const builder = new ControllerBuilder(controller, {authorize: false});
  return builder.build();
};

export const simplePrivetController = <In, Out>(controller: Controller<In, Out>) => {
  const builder = new ControllerBuilder(controller, {authorize: true});
  return builder.build();
};

function parseToken(request: Request): TokenDto | null {
  if (!request.headers || !request.headers.authorization) {
    return null;
  }
  const authorization = request.headers.authorization.split(' ');
  if (authorization.length < 2) {
    return null;
  }
  return authorization[1];
}

async function verifyToken(token: TokenDto):
  Promise<{ jwtVerifyError: jwt.VerifyErrors, tokenPayload: TokenPayloadDto }> {
  return new Promise(
    resolve => jwt.verify(
      token,
      SECRET_KEY,
      (err, decoded) => resolve({jwtVerifyError: err, tokenPayload: decoded as TokenPayloadDto}),
    ),
  );
}
