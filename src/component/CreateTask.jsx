"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTask({ user }) {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.id) {
      const response = await fetch("/api/tasks/", {
        method: "POST",
        body: JSON.stringify({
          name,
          detail,
          parentId: null,
          isCompleted: false,
        }),
      });

      const data = await response.json();

      if (data.error) {
        return setError(data.error);
      } else {
        router.refresh();
      }
    } else {
      setError("You must login to create a task");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      ></textarea>
      <button type="submit">Submit</button>
      <p>{error}</p>
    </form>
  );
}
