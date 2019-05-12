import {EntityRepository, getCustomRepository, Repository} from 'typeorm';
import AccountEntity from '../entities/AccountEntity';
import {LoginDto} from 'template-common';

@EntityRepository(AccountEntity)
class AccountRepository extends Repository<AccountEntity> {
  async validateLogin(login: LoginDto): Promise<AccountEntity | null> {
    if (!login.username || !login.password) {
      return null;
    }
    const account = await this.findOne({username: login.username});
    return account && account.validatePassword(login.password)
      ? account : null;
  }
}

const repositoryFactory = () => getCustomRepository(AccountRepository);

export default repositoryFactory;
