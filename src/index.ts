import Fastify from 'fastify';

import { userRoutes } from './routes/user.routes.js';

const fastify = Fastify({
  logger: false,
});

fastify.register(userRoutes, {
  prefix: '/api/v1/users',
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
