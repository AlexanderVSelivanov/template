import {Entity} from 'template-common';
import BaseEntity from '../../store/entities/BaseEntity';

export default (entity: BaseEntity): Entity => ({
  id: entity.id,
  created: entity.created,
  updated: entity.updated,
});
