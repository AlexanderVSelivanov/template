import accountRepositoryFactory from '../../../store/repository/accountRepository';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {UserDto} from 'template-common';
import UserEntity from '../../../store/entities/UserEntity';
import AccountEntity from '../../../store/entities/AccountEntity';
import {Controller, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mappers/userToUserDto';

const postUserController: Controller<UserDto, UserDto> = async ({input}) => {
  const userRepository = userRepositoryFactory();
  const user = new UserEntity();
  user.firstName = input.firstName;
  user.lastName = input.lastName;
  user.email = input.email;
  if (input.account) {
    const account = new AccountEntity();
    account.username = input.account.username;
    if (input.account.password) {
      const password = AccountEntity.getPasswordHash(input.account.password);
      account.passwordHash = password.hash;
      account.passwordSalt = password.salt;
    }
    const accountRepository = accountRepositoryFactory();
    const accountWithSameUsername = await accountRepository.isUsernameExist(account.username);
    if (accountWithSameUsername) {
      throw Error('Username not unique');
    }
    user.account = await accountRepository.save(account);
  }
  const createUser = await userRepository.save(user);
  return ok(userToUserDto(createUser));
};

export default postUserController;
