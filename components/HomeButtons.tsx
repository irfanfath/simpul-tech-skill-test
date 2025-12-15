"use client"

import { useState } from "react"
import Inbox from "@/components/Inbox"
import { Square, MessagesSquare } from "lucide-react"

export default function HomeButtons() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <Inbox onClose={() => setOpen(false)} />}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
        <button
          onClick={() => setOpen(prev => !prev)}
          className={`
            relative w-12 h-12 rounded-full
            transition-colors duration-200
            bg-[#4F4F4F]
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-10 h-10 rounded-full  ${open ? "bg-indigo-600" : "bg-white"}
              shadow-md flex items-center justify-center
              transition-transform duration-200
              ${open ? "translate-x-2" : "translate-x-0"}
            `}
          >
            {open ? (
              <MessagesSquare size={20} className="text-white" />
            ) : (
              <MessagesSquare size={20} className="text-indigo-600" />
            )}
          </span>
        </button>

        <button className="w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center">
          <Square size={18} className="text-gray-600" />
        </button>
      </div>
    </>
  )
}
