import {ApplicationError, Token} from 'template-common/types';
import {UserEntity} from 'template-common/entities';

export default {
  token: null as Token | null,
  user: null as UserEntity | null,
  error: null as ApplicationError | null,
};
