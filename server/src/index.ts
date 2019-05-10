import {PORT} from './config';
import routers from './routers';
import setupServer from './services/serverService';

const server = setupServer(routers);

server.listen(PORT);
