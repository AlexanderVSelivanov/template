import {Id, UserDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mappers/userToUserDto';
import AccountEntity from '../../../store/entities/AccountEntity';
import accountRepositoryFactory from '../../../store/repository/accountRepository';

const putUserByIdController: Controller<UserDto & { id: Id }, UserDto> = async ({input}) => {
  if (input && input.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(input.id, {relations: ['account']});
    if (user) {
      user.firstName = input.firstName;
      user.lastName = input.lastName;
      user.email = input.email;
      if (input.account) {
        const account = user.account ? user.account : new AccountEntity();
        account.username = input.account.username;
        account.disable = Boolean(input.disable);
        if (input.account.password) {
          const password = AccountEntity.getPasswordHash(input.account.password);
          account.passwordHash = password.hash;
          account.passwordSalt = password.salt;
        }
        const accountRepository = accountRepositoryFactory();
        const accountWithSameUsername = await accountRepository.isUsernameExist(account.username);
        if (accountWithSameUsername && (!user.account || user.account.id !== accountWithSameUsername.id) ) {
          throw Error('Username not unique');
        }
        user.account = await accountRepository.save(account);
      } else {
        if (user.account) {
          const accountRepository = accountRepositoryFactory();
          await accountRepository.remove(user.account);
        }
        user.account = undefined;
      }
      const updatedUser = await userRepository.save(user);
      return ok(userToUserDto(updatedUser));
    }
    return notFound('User entity not found');
  }
  return badRequest('Invalid user id');
};

export default putUserByIdController;
