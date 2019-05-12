import {RequestHandler} from 'express';
import * as jwt from 'jsonwebtoken';

import {LoginDto, TokenDto, TokenPayloadDto, ResponseStatus} from 'template-common';
import {SECRET_KEY} from '../../../config';
import accountRepositoryFactory from '../../../store/repository/accountRepository';

const tokenExpiresIn = '24h';

const loginController: RequestHandler = async (request, response, next) => {
  try {
    const login: LoginDto = request.body;
    const account = await accountRepositoryFactory().validateLogin(login);
    if (account) {
      const tokenPayload: TokenPayloadDto = {
        accountId: account.id,
        username: account.username,
      };
      const token: TokenDto = jwt.sign(tokenPayload, SECRET_KEY, {expiresIn: tokenExpiresIn, algorithm: 'HS256'});
      response.send(token);
    } else {
      response.sendStatus(ResponseStatus.BadRequest);
    }
  } catch (error) {
    next(error);
  }
};

export default loginController;
