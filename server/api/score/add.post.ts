export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await prisma.score.create({
    data: {
      userId: body.userId,
      time: body.time,
      difficulty: body.difficulty,
      moves: body.moves,
    },
  });
});
