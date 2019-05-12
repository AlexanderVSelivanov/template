import {Column, Entity, OneToOne} from 'typeorm';

import BaseEntity from './BaseEntity';
import AccountEntity from './AccountEntity';

@Entity()
class UserEntity extends BaseEntity {
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
  @Column()
  email!: string;
  @OneToOne(type => AccountEntity, account => account.user)
  account?: AccountEntity;
}

export default UserEntity;
