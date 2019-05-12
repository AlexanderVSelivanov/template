import {Id} from 'template-common';
import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: Id;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
  @Column({default: false})
  disable!: boolean;
}

export default BaseEntity;
