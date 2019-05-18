import * as jwt from 'jsonwebtoken';

import {LoginDto, TokenDto, TokenPayloadDto} from 'template-common';
import {SECRET_KEY} from '../../../config';
import accountRepositoryFactory from '../../../store/repository/accountRepository';
import {badRequest, Controller, ok} from '../../../utils/ControllerBuilder';

const tokenExpiresIn = '24h';

const loginController: Controller<LoginDto, TokenDto> = async ({input}) => {
  const account = await accountRepositoryFactory().validateLogin(input);
  if (account) {
    const tokenPayload: TokenPayloadDto = {
      accountId: account.id,
      username: account.username,
    };
    const token: TokenDto = jwt.sign(tokenPayload, SECRET_KEY, {expiresIn: tokenExpiresIn, algorithm: 'HS256'});
    return ok(token);
  }
  return badRequest();
};

export default loginController;
