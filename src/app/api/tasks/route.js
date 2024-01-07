import { fetchUser } from "@/lib/fetchUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//backend to create a task
export async function POST(req, res) {
  try {
    //pull name, detail, parentId and idCompleted from the frontend
    const { name, detail, parentId, isCompleted } = await req.json();

    const user = await fetchUser();

    //if there is no user.id - user will get this error msg
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "Please login to create a task",
      });
    }

    //if no name was entered - user will get this error msg
    if (!name) {
      return NextResponse.json({
        success: false,
        error: "You need to provide a name",
      });
    }

    //creates task in the db
    const task = await prisma.task.create({
      data: {
        name,
        detail,
        parentId,
        userId: user.id,
        isCompleted,
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
