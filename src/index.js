import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

// await initMongoConnection();
// setupServer();

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
