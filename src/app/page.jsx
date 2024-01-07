import CreateTask from "@/component/CreateTask";
import { fetchUser } from "@/lib/fetchUser";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const user = await fetchUser();

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <section>
      <CreateTask user={user} />

      {tasks.map((task) => {
        return (
          <Link key={task.id} href={`/tasks/${task.id}`}>
            <div>
              <p>{task.name}</p>
              <p>{task.detail}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
