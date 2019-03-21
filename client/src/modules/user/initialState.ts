import ApplicationError from 'src/types/ApplicationError';
import User from 'src/types/entity/User';

export default {
  user: <User | null> null,
  error: <ApplicationError | null> null,
};
