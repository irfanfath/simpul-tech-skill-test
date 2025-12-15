"use client"

import { Message } from "@/types/chat"
import { useState, useRef, useEffect } from "react"

export default function MessageBubble({
    msg,
    onEdit,
    onDelete
}: {
    msg: Message
    onEdit: (id: number, body: string) => void
    onDelete: (id: number) => void
}) {
    const [openMenu, setOpenMenu] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpenMenu(false)
            }
        }

        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    function bubbleColorFromName(name: string) {
        let hash = 0
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash)
        }

        const hue = Math.abs(hash) % 360
        return `hsl(${hue}, 85%, 90%)`
    }

    return (
        <div
            ref={wrapperRef}
            className={`relative w-fit max-w-[85%] ${msg.isMine ? "ml-auto text-right" : ""
                }`}
        >
            <p className={`text-[11px] ${msg.isMine ? "text-purple-600" : "text-[#E5A443]"} mb-1`}>{msg.name}</p>
            <div className="flex items-start gap-1">
                {msg.isMine && (
                    <button
                        onClick={() => setOpenMenu(v => !v)}
                        className="text-gray-500 hover:text-gray-700 mt-1"
                    >
                        ⋯
                    </button>
                )}
                <div className="rounded-xl px-3 py-2 text-sm leading-relaxed text-black" style={{ backgroundColor: msg.isMine ? "#E9D5FF" : bubbleColorFromName(msg.name) }}>
                    {msg.body}
                    <div className={`text-[10px] text-gray-400 mt-1 ${msg.isMine ? "text-right" : "text-left"}`}>
                        {msg.time}
                    </div>
                </div>
            </div>

            {openMenu && msg.isMine && (
                <div className="absolute left-0 top-7 z-50 w-20 bg-white border rounded-md shadow-md text-xs">
                    <button
                        onClick={() => {
                            onEdit(msg.id, msg.body)
                            setOpenMenu(false)
                        }}
                        className="w-full px-3 py-2 text-left text-black hover:bg-gray-100"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => {
                            onDelete(msg.id)
                            setOpenMenu(false)
                        }}
                        className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}
