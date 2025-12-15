"use client"

import { useEffect, useState } from "react"
import { fetchChats } from "@/lib/api"
import ChatRoom from "./ChatRoom"
import ChatList from "./ChatList"

export default function Inbox({ onClose }: { onClose: () => void }) {
  const [chats, setChats] = useState<any>({})
  const [activePostId, setActivePostId] = useState<number | null>(null)

  useEffect(() => {
    fetchChats().then(setChats)
  }, [])

  if (activePostId)
    return (
      <ChatRoom
        messages={chats[activePostId]}
        onBack={() => setActivePostId(null)}
      />
    )

  return <ChatList chats={chats} onOpen={setActivePostId}  />
}
