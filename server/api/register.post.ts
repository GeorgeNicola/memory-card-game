import { prisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });
});
