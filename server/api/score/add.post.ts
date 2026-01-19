import { getPrisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const prisma = await getPrisma();

  return await prisma.score.create({
    data: {
      userId: body.userId,
      time: body.time,
      difficulty: body.difficulty,
      moves: body.moves,
    },
  });
});
