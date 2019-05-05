import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import {Login, Token, TokenPayload, ResponseStatus} from 'template-common';
import {SECRET_KEY} from '../../../config';
import logger from '../../../services/loggerService';

const tokenExpiresIn = '24h';

const loginController: express.RequestHandler = (request, response) => {
  try {
    // todo: check login
    const login: Login = request.body;
    if (login.username && login.password) {

    }

    const tokenPayload: TokenPayload = {
      userId: 1,
    };
    const token: Token = jwt.sign(tokenPayload, SECRET_KEY, {expiresIn: tokenExpiresIn, algorithm: 'HS256'});
    response.send(token);
  } catch (error) {
    logger.error(error);
    response
      .status(ResponseStatus.InternalServerError)
      .send(error);
  }
};

export default loginController;
