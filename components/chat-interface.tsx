"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, X, ChevronDown, Paperclip, ImageIcon, Smile, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import TextareaAutosize from "react-textarea-autosize"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  status: "sending" | "sent" | "error"
}

interface ChatInterfaceProps {
  onClose: () => void
  initialPrompt?: string
}

export function ChatInterface({ onClose, initialPrompt = "" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState(initialPrompt)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Sample responses for demo purposes
  const sampleResponses = [
    "I've analyzed your notes on cell biology. The key concepts you should focus on are cell membrane structure, organelle functions, and cellular respiration.",
    "Based on your study patterns, I recommend reviewing the material on mitochondria and cellular energy production before your upcoming exam.",
    "Here's a summary of the key points from your notes:\n\n• Cell membrane: Phospholipid bilayer with embedded proteins\n• Mitochondria: Powerhouse of the cell, produces ATP\n• Endoplasmic reticulum: Protein synthesis and transport\n• Golgi apparatus: Modification and packaging of proteins",
    "I've created a set of flashcards based on your notes. Would you like to review them now?",
    "Your understanding of cellular respiration appears strong, but you might want to spend more time on photosynthesis concepts. The light-dependent and light-independent reactions seem to be areas where you could improve.",
  ]

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle scroll to show/hide scroll button
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate typing indicator
    setIsTyping(true)

    // Simulate API delay
    setTimeout(() => {
      // Get random response
      const responseText = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]

      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "assistant",
        timestamp: new Date(),
        status: "sent",
      }

      // Add assistant message to chat
      setMessages((prev) => [
        ...prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)),
        assistantMessage,
      ])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <motion.div
      className="flex flex-col h-full bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900/50 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-900">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
            <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              AI
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Study Assistant</h3>
            <p className="text-xs text-purple-700/70 dark:text-purple-300/70">Powered by AI</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        style={{
          scrollBehavior: "smooth",
          maxHeight: "calc(100vh - 16rem)", // Adjust based on header and input heights
        }}
      >
        {/* Welcome message */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100">
              How can I help with your studies today?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Ask me questions about your notes, request summaries, create flashcards, or get help with difficult
              concepts.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Summarize my notes", "Create flashcards", "Explain this concept", "Quiz me on this topic"].map(
                (suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                    onClick={() => setInputValue(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ),
              )}
            </div>
          </motion.div>
        )}

        {/* Chat messages */}
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn("flex items-start gap-3 max-w-[85%]", message.sender === "user" ? "ml-auto" : "mr-auto")}
            >
              {message.sender === "assistant" && (
                <Avatar className="h-8 w-8 mt-0.5 bg-purple-100 dark:bg-purple-900">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm",
                  message.sender === "user"
                    ? "bg-purple-600 text-white dark:bg-purple-700"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div
                  className={cn(
                    "text-[10px] mt-1",
                    message.sender === "user"
                      ? "text-purple-200 dark:text-purple-300/70"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  {message.status === "sending"
                    ? "Sending..."
                    : message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3 max-w-[85%]"
            >
              <Avatar className="h-8 w-8 mt-0.5 bg-purple-100 dark:bg-purple-900">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 text-sm flex items-center">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="sticky bottom-4 flex justify-center"
            >
              <Button
                size="sm"
                variant="outline"
                className="rounded-full shadow-md bg-white dark:bg-gray-800"
                onClick={scrollToBottom}
              >
                <ChevronDown className="h-4 w-4 mr-1" />
                New messages
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 z-10">
        <div className="relative flex items-end rounded-lg bg-background shadow-sm border-gray-200 dark:border-gray-800 focus-within:border-gray-300 dark:focus-within:border-gray-700 overflow-hidden">
          <TextareaAutosize
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none border-0 bg-transparent p-3 pr-10 text-sm outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[56px] max-h-[200px]"
            minRows={1}
            maxRows={6}
          />
          <div className="flex items-center gap-2 p-2">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="submit"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                inputValue.trim()
                  ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed",
              )}
              disabled={!inputValue.trim()}
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <div>Press Enter to send, Shift+Enter for new line</div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            AI Suggestions
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
