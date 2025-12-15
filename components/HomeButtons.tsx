"use client"

import { useState } from "react"
import Inbox from "@/components/Chat/Inbox"
import TaskPanel from "@/components/Task/TaskPanel"
import { ClipboardList, MessagesSquare } from "lucide-react"

export default function HomeButtons() {
    const [openChat, setOpenChat] = useState(false)
    const [openTask, setOpenTask] = useState(false)

    return (
        <>
            {openChat && <Inbox onClose={() => setOpenChat(false)} />}
            {openTask && <TaskPanel onClose={() => setOpenTask(false)} />}

            <div className="fixed bottom-6 right-6 flex gap-3 z-50">
                <button
                    onClick={() => {
                        setOpenChat(v => !v)
                        setOpenTask(false)
                    }}
                    className={`
                    relative w-12 h-12 rounded-full
                    transition-colors duration-200
                    bg-[#4F4F4F]
                  `}
                >
                    <span
                        className={`
                      absolute top-1 left-1 w-10 h-10 rounded-full  ${openChat ? "bg-indigo-600" : "bg-white"}
                      shadow-md flex items-center justify-center
                      transition-transform duration-200
                      ${openChat ? "translate-x-2" : "translate-x-0"}
                    `}
                    >
                        {openChat ? (
                            <MessagesSquare size={20} className="text-white" />
                        ) : (
                            <MessagesSquare size={20} className="text-indigo-600" />
                        )}
                    </span>
                </button>

                <button
                    onClick={() => {
                        setOpenTask(v => !v)
                        setOpenChat(false)
                    }}
                    className={`
                    relative w-12 h-12 rounded-full
                    transition-colors duration-200
                    bg-[#4F4F4F]
                  `}
                >
                    <span
                        className={`
                      absolute top-1 left-1 w-10 h-10 rounded-full  ${openTask ? "bg-[#F8B76B]" : "bg-white"}
                      shadow-md flex items-center justify-center
                      transition-transform duration-200
                      ${openTask ? "translate-x-2" : "translate-x-0"}
                    `}
                    >
                        {openTask ? (
                            <ClipboardList size={20} className="text-white" />
                        ) : (
                            <ClipboardList size={20} className="text-[#F8B76B]" />
                        )}
                    </span>
                </button>
            </div>
        </>
    )
}
