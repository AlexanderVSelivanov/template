import {Column, Entity, OneToMany, OneToOne} from 'typeorm';

import BaseEntity from './BaseEntity';
import AccountEntity from './AccountEntity';
import NoteEntity from './NoteEntity';

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

  @OneToMany(type => NoteEntity, note => note.user)
  notes?: NoteEntity[];
}

export default UserEntity;
