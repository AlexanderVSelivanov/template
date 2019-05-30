import {Column, Entity, ManyToOne} from 'typeorm';

import BaseEntity from './BaseEntity';
import UserEntity from './UserEntity';

@Entity()
class NoteEntity extends BaseEntity {
  @Column()
  title!: string;
  @Column({nullable: true})
  text?: string;
  @Column('simple-array', {nullable: true})
  tags?: string[];

  @ManyToOne(type => UserEntity, user => user.notes)
  user!: UserEntity;
}

export default NoteEntity;
