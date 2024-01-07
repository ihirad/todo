import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    const cookieStore = cookies();
    const { username, password } = await req.json();

    //If user did not provide username or password user recieves error msg
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You must provide a username and password",
      });
    }

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User does not exist. Please Register",
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return NextResponse.json({
        success: false,
        error: "Username and/or password are incorrect.",
      });
    }

    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET
    );

    cookieStore.set("token", token);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
