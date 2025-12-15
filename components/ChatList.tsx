"use client"

import { useMemo, useState } from "react"

function getInitials(name: string) {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return `hsl(${hash % 360}, 70%, 80%)`
}

export default function ChatList({
  chats,
  onOpen,
  loading = false
}: {
  chats: Record<number, any[]>
  onOpen: (id: number) => void
  loading?: boolean
}) {
  const [search, setSearch] = useState("")
  const filteredChats = useMemo(() => {
    if (!search.trim()) return Object.entries(chats)
    const q = search.toLowerCase()
    return Object.entries(chats).filter(([postId, msgs]: any) => {
      return (
        postId.includes(q) ||
        msgs.some(
          (m: any) =>
            m.name.toLowerCase().includes(q) ||
            m.body.toLowerCase().includes(q)
        )
      )
    })
  }, [search, chats])

  return (
    <div className="fixed bottom-25 right-6 w-[500px] h-[700px] bg-white shadow-2xl flex flex-col z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        {loading && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      <div className="p-3 border-b">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="relative flex-1 overflow-y-auto">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && filteredChats.length === 0 && (
          <p className="text-sm text-gray-400 text-center mt-10">
            No chat found
          </p>
        )}

        {filteredChats.map(([postId, msgs]: any) => {
          const unread = msgs.some((m: any) => m.unread)
          const users = Array.from(
            new Map(msgs.map((m: any) => [m.email, m])).values()
          ).slice(0, 3)

          const lastMsg = msgs[msgs.length - 1]

          return (
            <div
              key={postId}
              onClick={() => onOpen(Number(postId))}
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition border-b"
            >
              <div className="flex gap-3 items-center">
                <div className="flex -space-x-2">
                  {users.map((u: any, idx: number) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
                      style={{ backgroundColor: stringToColor(u.name) }}
                    >
                      {getInitials(u.name)}
                    </div>
                  ))}
                </div>

                <div className="max-w-[210px]">
                  <p className="text-xs font-semibold text-blue-600">
                    Post {postId}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {lastMsg.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {lastMsg.body}
                  </p>
                </div>
              </div>

              {unread && (
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
