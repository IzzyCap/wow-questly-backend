import { FastifyInstance } from 'fastify';
import { getMissionBySlug } from '../handlers/getMission';

export async function missionRoutes(server: FastifyInstance) {
  server.get('/api/missions/:slug', async (req, reply) => {
    const { slug } = req.params as { slug: string };
    
    const mission = await getMissionBySlug(slug);
    
    if (!mission) {
      return reply.status(404).send({ error: 'Mission not found' });
    }
    
    return reply.send(mission);
  });
}
