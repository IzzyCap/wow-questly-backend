import { FastifyInstance } from 'fastify';
import { searchMissions } from '../handlers/searchMissions';

export async function searchRoutes(server: FastifyInstance) {
  server.get('/api/missions/search', async (req, reply) => {
    const { q } = req.query as { q?: string };
    
    const results = await searchMissions(q || '');
    
    return reply.send(results);
  });
}
