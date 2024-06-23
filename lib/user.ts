import prisma from "./prisma";

export async function getUserByEmail(email: string) {
  console.log(email);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}
