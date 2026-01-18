enum IOrderByDirection {
  ASC = "asc",
  DESC = "desc",
}
interface IOrderBy {
  time?: IOrderByDirection;
  moves?: IOrderByDirection;
  name?: IOrderByDirection;
  difficulty?: IOrderByDirection;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const orderBy: IOrderBy = query.orderBy
    ? JSON.parse(query.orderBy as string)
    : {};

  return await prisma.score.findMany({
    where: {
      userId: query.userId ? Number(query.userId) : undefined,
      difficulty: query.difficulty ? Number(query.difficulty) : undefined,
    },
    orderBy: orderBy,
    include: { user: true },
  });
});
