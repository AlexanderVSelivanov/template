import {RequestHandler} from 'express';

import accountRepositoryFactory from '../../../store/repository/accountRepository';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {UserDto} from 'template-common';
import UserEntity from '../../../store/entities/UserEntity';
import AccountEntity from '../../../store/entities/AccountEntity';

const putUserController: RequestHandler = async (request, response, next) => {
  try {
    const userDto: UserDto = request.body;
    const userRepository = userRepositoryFactory();

    const user = new UserEntity();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;

    if (userDto.account) {
      const account = new AccountEntity();
      account.username = userDto.account.username;
      if (userDto.account.password) {
        const password = AccountEntity.getPasswordHash(userDto.account.password);
        account.passwordHash = password.hash;
        account.passwordSalt = password.salt;
      }
      const accountRepository = accountRepositoryFactory();
      const createAccount = await accountRepository.save(account);
      user.account = createAccount;
    }

    const createUser = await userRepository.save(user);
    response.send(createUser);
  } catch (error) {
    next(error);
  }
};

export default putUserController;
