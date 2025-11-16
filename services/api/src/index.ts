import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { missionRoutes } from './routes/missions';
import { searchRoutes } from './routes/search';

const server = Fastify({ logger: true });

// Register plugins
server.register(cors, { origin: true });

// Register routes
server.register(searchRoutes);
server.register(missionRoutes);

// Health check
server.get('/health', async () => ({ status: 'ok' }));

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '4000');
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`API listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
