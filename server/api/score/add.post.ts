export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("Received score data:", body);
  return await prisma.score.create({
    data: {
      userId: body.userId,
      time: body.time,
      difficulty: body.difficulty,
      moves: body.moves,
    },
  });
});
