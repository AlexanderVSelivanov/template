import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

import BaseEntity from './BaseEntity';
import UserEntity from './UserEntity';

@Entity()
class NoteEntity extends BaseEntity {
  @Column()
  title!: string;
  @Column()
  text?: string;
  @Column('simple-array')
  tags?: string[];

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user!: UserEntity;
}

export default NoteEntity;
