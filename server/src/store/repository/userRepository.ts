import {EntityRepository, getCustomRepository, Repository} from 'typeorm';
import UserEntity from '../entities/UserEntity';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {

  findByName(firstName: string, lastName: string) {
    return this.findOne({firstName, lastName});
  }

}

const repositoryFactory = () => getCustomRepository(UserRepository);

export default repositoryFactory;
