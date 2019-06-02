import {EntityDto} from 'template-common';
import BaseEntity from '../../store/entities/BaseEntity';

export default (entity: BaseEntity): EntityDto => ({
  id: entity.id,
  created: entity.created,
  updated: entity.updated,
  disable: entity.disable,
});
