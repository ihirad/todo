import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    const cookieStore = cookies();
    const { username, password } = await req.json();

    //didnt provide username or password user recieves error msg
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You need to provde a username and password",
      });
    }

    //
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (userExists) {
      return NextResponse.json({
        success: false,
        error: "The username already exists. Pick a different name.",
      });
    }

    //hash and salt the code
    const hashedPassword = await bcrypt.hash(password, 10);

    //creates in the db
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    //signs the JWT token https://www.linode.com/docs/guides/how-to-authenticate-using-jwt/
    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET
    );

    //creates the cookie by setting the token
    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
