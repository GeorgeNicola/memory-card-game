import { getPrisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const prisma = await getPrisma();
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) throw createError({ statusCode: 401, message: "Date incorecte" });
  return user;
});
