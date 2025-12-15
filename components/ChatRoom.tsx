"use client"

import { useEffect, useRef, useState } from "react"
import { Message } from "@/types/chat"
import MessageBubble from "./MessageBubble"
import { ArrowLeft } from "lucide-react"

function randomTime() {
    const d = new Date()
    d.setMinutes(d.getMinutes() - Math.floor(Math.random() * 60))
    return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })
}

const OTHER_USERS = [
    { name: "Mary Hilda", email: "mary@mail.com" },
    { name: "John Doe", email: "john@mail.com" },
    { name: "Alex Tan", email: "alex@mail.com" }
]

export default function ChatRoom({
    messages,
    onBack
}: {
    messages: Message[]
    onBack: () => void
}) {
    const [chatMessages, setChatMessages] = useState<Message[]>(messages ?? [])
    const [text, setText] = useState("")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [isTyping, setIsTyping] = useState(false)

    const bottomRef = useRef<HTMLDivElement>(null)
    const postId = chatMessages[0]?.postId ?? "-"

    const participantsCount = new Set(
        chatMessages.map(m => m.email)
    ).size

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages, isTyping])

    useEffect(() => {
        setChatMessages(prev => prev.map(m => ({ ...m, unread: false })))
    }, [])
    const sendFakeReply = () => {
        const sender =
            OTHER_USERS[Math.floor(Math.random() * OTHER_USERS.length)]

        setIsTyping(true)
        const delay = 1500 + Math.random() * 1000
        setTimeout(() => {
            setIsTyping(false)
            setChatMessages(prev => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    postId,
                    name: sender.name,
                    email: sender.email,
                    body: "This is an example realtime message",
                    time: randomTime(),
                    isMine: false,
                    unread: true
                }
            ])
        }, delay)
    }

    const handleSend = () => {
        if (!text.trim()) return
        if (editingId !== null) {
            setChatMessages(prev =>
                prev.map(m =>
                    m.id === editingId ? { ...m, body: text } : m
                )
            )
            setEditingId(null)
            setText("")
            return
        }

        setChatMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                postId,
                name: "You",
                email: "me@quicks.app",
                body: text,
                time: randomTime(),
                isMine: true,
                unread: false
            }
        ])
        setText("")
        sendFakeReply()
    }

    const handleEdit = (id: number, body: string) => {
        setEditingId(id)
        setText(body)
    }

    const handleDelete = (id: number) => {
        setChatMessages(prev => prev.filter(m => m.id !== id))
        if (editingId === id) {
            setEditingId(null)
            setText("")
        }
    }

    return (
        <div className="fixed bottom-25 right-6 w-[500px] h-[700px] bg-white shadow-2xl flex flex-col z-50">
            <header className="flex items-center gap-2 p-3 border-b bg-white">
                <button className="cursor-pointer" onClick={onBack}><ArrowLeft color="#000000" /></button>
                <div>
                    <p className="font-semibold text-sm text-[#2F80ED]">Post {postId}</p>
                    <p className="text-xs text-gray-500">{participantsCount} Participants</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                <div className="text-center text-xs text-gray-400">
                    New Message
                </div>

                {chatMessages.map(m => (
                    <MessageBubble
                        key={m.id}
                        msg={m}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}

                {isTyping && (
                    <div className="text-xs text-gray-400 italic">
                        Other user is typing…
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {editingId !== null && (
                <div className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 flex justify-between">
                    <span>Editing message</span>
                    <button
                        onClick={() => {
                            setEditingId(null)
                            setText("")
                        }}
                        className="text-red-500"
                    >
                        Cancel
                    </button>
                </div>
            )}

            <div className="p-3 border-t flex gap-2 bg-white">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    className="flex-1 border rounded px-3 py-2 text-sm text-black"
                    placeholder={
                        editingId !== null
                            ? "Edit message..."
                            : "Type a new message"
                    }
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 rounded text-sm"
                >
                    {editingId !== null ? "Update" : "Send"}
                </button>
            </div>
        </div>
    )
}
