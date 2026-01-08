export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  return await prisma.score.findMany({
    where: {
      userId: query.userId ? Number(query.userId) : undefined,
      dificulty: query.dificulty ? Number(query.dificulty) : undefined
    },
    orderBy: {
      timp: 'asc' 
    },
    include: { user: true } 
  })
})