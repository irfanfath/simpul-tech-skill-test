import { Message } from "@/types/chat"

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
