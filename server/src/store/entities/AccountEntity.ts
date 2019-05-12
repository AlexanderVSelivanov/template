import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

import BaseEntity from './BaseEntity';
import UserEntity from './UserEntity';
import getRandomString from '../../utils/getRandomString';
import getSha512Hash from '../../utils/getSha512Hash';

const saltLength = 20;

@Entity()
class AccountEntity extends BaseEntity {

  static getPasswordHash(password: string): { hash: string, salt: string } {
    const salt = getRandomString(saltLength);
    const hash = getSha512Hash(password, salt);
    return {hash, salt};
  }

  @Column()
  username!: string;
  @Column({nullable: true})
  passwordHash?: string;
  @Column({length: saltLength, nullable: true})
  passwordSalt?: string;
  @OneToOne(type => UserEntity)
  @JoinColumn()
  user!: UserEntity;

  validatePassword = (password: string) => this.passwordSalt && this.passwordHash
    ? getSha512Hash(password, this.passwordSalt) === this.passwordHash
    : false
}

export default AccountEntity;
