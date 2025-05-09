"use client"

import type React from "react"

import { useEffect, useRef, useCallback } from "react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ImageIcon, FileUp, Figma, MonitorIcon, CircleUserRound, ArrowUpIcon, Paperclip } from "lucide-react"

interface UseAutoResizeTextareaProps {
  minHeight: number
  maxHeight?: number
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current
      if (!textarea) return

      if (reset) {
        textarea.style.height = `${minHeight}px`
        return
      }

      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`

      // Calculate new height
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY))

      textarea.style.height = `${newHeight}px`
    },
    [minHeight, maxHeight],
  )

  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = `${minHeight}px`
    }
  }, [minHeight])

  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [adjustHeight])

  return { textareaRef, adjustHeight }
}

export function VercelV0Chat() {
  const [value, setValue] = useState("")
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        setValue("")
        adjustHeight(true)
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-300">What can I help you learn today?</h1>

      <div className="w-full">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-400 shadow-sm">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                adjustHeight()
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your studies..."
              className={cn(
                "w-full px-4 py-3",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-gray-700 dark:text-purple-100 text-sm",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-gray-400 dark:placeholder:text-gray-400 placeholder:text-sm",
                "min-h-[60px]",
              )}
              style={{
                overflow: "hidden",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 border-t border-purple-200 dark:border-purple-800/50">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group p-2 hover:bg-purple-200/50 dark:hover:bg-purple-800/30 rounded-lg transition-colors flex items-center gap-1"
                onClick={() => alert("File upload functionality would be implemented here")}
              >
                <Paperclip className="w-4 h-4 text-dark-600 dark:text-light-300" />
                <span className="text-xs text-dark-500 dark:text-dark-300 hidden group-hover:inline transition-opacity">
                  Attach
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn(
                  "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 flex items-center justify-between gap-1",
                  value.trim()
                    ? "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 border-transparent"
                    : "text-purple-400 dark:text-purple-500 hover:bg-purple-100/50 dark:hover:bg-purple-800/30",
                )}
              >
                <ArrowUpIcon
                  className={cn("w-4 h-4", value.trim() ? "text-white" : "text-purple-400 dark:text-purple-500")}
                />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
