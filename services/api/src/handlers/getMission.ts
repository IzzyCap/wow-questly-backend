import { prisma } from '@wow-questly/database';
import { redis } from '../lib/redis';

export async function getMissionBySlug(slug: string) {
  const cacheKey = `mission:${slug}`;
  
  // Try cache first
  // const cached = await redis.get(cacheKey);
  // if (cached) {
  //   return JSON.parse(cached);
  // }

  // Query database
  const mission = await prisma.mission.findUnique({
    where: { slug },
  });

  // if (!mission) {
  //   return null;
  // }

  // // Cache result
  // await redis.set(cacheKey, JSON.stringify(mission), 'EX', 60 * 60); // 1h
  
  return mission;
}
