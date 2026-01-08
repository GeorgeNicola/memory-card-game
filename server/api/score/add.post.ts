export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await prisma.score.create({
    data: {
      userId: body.userId,
      timp: body.timp,
      dificulty: body.dificulty
    }
  })
})