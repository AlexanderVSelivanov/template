import {PORT} from '../../config';
import logger from '../loggerService';

const onServerListeningHandler = () => {
  const bind = typeof PORT === 'string' ? 'pipe ' + PORT : 'port ' + PORT;
  logger.info('Listening on ' + bind);
};

export default onServerListeningHandler;
