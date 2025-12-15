import { Message } from "@/types/chat"
import { Task } from "@/types/task"

const randomTime = () => {
  const d = new Date(Date.now() - Math.random() * 86400000)
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

export async function fetchChats(): Promise<Record<number, Message[]>> {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments")
  const data = await res.json()

  return data.reduce((acc: any, item: any) => {
    if (!acc[item.postId]) acc[item.postId] = []

    acc[item.postId].push({
      ...item,
      time: randomTime(),
      isMine: item.email === "me@quicks.app",
      unread: Math.random() > 0.7
    })
    return acc
  }, {})
}

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch("https://mocki.io/v1/7eaa49a0-4af6-44e3-aa60-180b826e370b");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data: Task[] = await res.json();
  return data;
};
