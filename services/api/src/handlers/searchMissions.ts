import { prisma } from '@wow-questly/database';
import { redis } from '../lib/redis';

export async function searchMissions(query: string) {
  if (!query) {
    return [];
  }

  const cacheKey = `search:${query}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Query PostgreSQL with ILIKE for case-insensitive search
  const missions = await prisma.mission.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { zone: { contains: query, mode: 'insensitive' } },
        { expansion: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 20,
  });

  // Cache result
  await redis.set(cacheKey, JSON.stringify(missions), 'EX', 60 * 5); // 5min
  
  return missions;
}
