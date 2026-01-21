import { prisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user)
    throw createError({
      statusCode: 401,
      message: "Email or password is incorrect",
    });
  return user;
});
