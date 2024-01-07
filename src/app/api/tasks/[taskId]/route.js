import { fetchUser } from "@/lib/fetchUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//edit
export async function PUT(req, res) {
  try {
    //pulls name, detail, isCompleted from the frontend
    const { name, detail, isCompleted } = await req.json();
    //pulls taskId using [taskId] folder hierarchy
    const { taskId } = res.params;
    const user = await fetchUser();

    //if there is no user.id - user will get this error msg
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "You must login to create a task",
      });
    }
    //if no name was entered - user will get this error msg
    if (!name) {
      return NextResponse.json({
        success: false,
        error: "You need to provide a name",
      });
    }

    //update/edit in the database
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { name, detail, isCompleted },
    });
    return NextResponse.json({ success: true, task });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

//delete post
export async function DELETE(req, res) {
  try {
    const { taskId } = res.params;
    const user = await fetchUser();

    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
