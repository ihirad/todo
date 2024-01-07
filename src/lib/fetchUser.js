import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

export async function fetchUser() {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("token");

    if (!userCookie) {
      return {};
    }

    const { userId } = jwt.verify(userCookie.value, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      delete user.password;
    }

    return user;
  } catch (error) {
    return {};
  }
}
