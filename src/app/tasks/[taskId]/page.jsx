import { prisma } from "@/lib/prisma";

export default async function Tasks({ params }) {
  const { taskId } = params;

  const subtasks = await prisma.task.findMany({
    where: {
      parentId: taskId,
    },
  });
  return <div>{taskId}</div>;
}
