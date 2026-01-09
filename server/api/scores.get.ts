export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  return await prisma.score.findMany({
    where: {
      userId: query.userId ? Number(query.userId) : undefined,
      difficulty: query.difficulty ? Number(query.difficulty) : undefined,
    },
    orderBy: {
      time: "asc",
    },
    include: { user: true },
  });
});
