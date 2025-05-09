"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { useState, useCallback, useEffect, useRef } from "react"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  ImageIcon,
  LinkIcon,
  Undo,
  Redo,
  CheckSquare,
  Save,
  X,
  ChevronLeft,
  Sparkles,
  Palette,
  Clock,
  Tag,
  Plus,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"

interface TipTapEditorProps {
  onSave: (title: string, content: string, tags: string[]) => void
  onCancel: () => void
  initialTitle?: string
  initialContent?: string
  initialTags?: string[]
}

export function TipTapEditor({
  onSave,
  onCancel,
  initialTitle = "",
  initialContent = "",
  initialTags = [],
}: TipTapEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [tagInput, setTagInput] = useState("")
  const [selectedColor, setSelectedColor] = useState("purple")
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write")
  const [isTyping, setIsTyping] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showToolbar, setShowToolbar] = useState(true)
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What's the title?"
          }
          return 'Start writing or type "/" for commands...'
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
    ],
    content: initialContent,
    autofocus: false,
    onUpdate: ({ editor }) => {
      setIsTyping(true)
      clearTimeout(typingTimeout.current)
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false)
      }, 1000)

      // Update character and word count
      const text = editor.getText()
      setCharCount(text.length)
      setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length)
    },
  })

  const typingTimeout = useRef<NodeJS.Timeout>()

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (editor && title && editor.getText().trim().length > 0) {
        // This would be where you'd implement auto-save
        setLastSaved(new Date())
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(interval)
  }, [editor, title])

  // Focus title input on mount
  useEffect(() => {
    if (titleInputRef.current && !initialTitle) {
      titleInputRef.current.focus()
    }
  }, [initialTitle])

  // Handle scroll to hide/show toolbar
  useEffect(() => {
    const handleScroll = () => {
      if (!editorContainerRef.current) return

      const scrollTop = editorContainerRef.current.scrollTop
      if (scrollTop > 100 && showToolbar) {
        setShowToolbar(false)
      } else if (scrollTop <= 100 && !showToolbar) {
        setShowToolbar(true)
      }
    }

    const container = editorContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [showToolbar])

  const addTag = useCallback(() => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }, [tagInput, tags])

  const removeTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove))
    },
    [tags],
  )

  const handleSave = useCallback(() => {
    if (editor) {
      onSave(title, editor.getHTML(), tags)
      setLastSaved(new Date())
    }
  }, [editor, title, tags, onSave])

  const colors = [
    { name: "purple", class: "bg-purple-500", textClass: "text-purple-500" },
    { name: "blue", class: "bg-blue-500", textClass: "text-blue-500" },
    { name: "green", class: "bg-green-500", textClass: "text-green-500" },
    { name: "red", class: "bg-red-500", textClass: "text-red-500" },
    { name: "amber", class: "bg-amber-500", textClass: "text-amber-500" },
    { name: "pink", class: "bg-pink-500", textClass: "text-pink-500" },
    { name: "indigo", class: "bg-indigo-500", textClass: "text-indigo-500" },
    { name: "teal", class: "bg-teal-500", textClass: "text-teal-500" },
  ]

  const getColorClass = (colorName: string) => {
    const color = colors.find((c) => c.name === colorName)
    return color ? color.class : "bg-purple-500"
  }

  const getTextColorClass = (colorName: string) => {
    const color = colors.find((c) => c.name === colorName)
    return color ? color.textClass : "text-purple-500"
  }

  const getBorderColorClass = (colorName: string) => {
    switch (colorName) {
      case "purple":
        return "border-purple-200 dark:border-purple-800"
      case "blue":
        return "border-blue-200 dark:border-blue-800"
      case "green":
        return "border-green-200 dark:border-green-800"
      case "red":
        return "border-red-200 dark:border-red-800"
      case "amber":
        return "border-amber-200 dark:border-amber-800"
      case "pink":
        return "border-pink-200 dark:border-pink-800"
      case "indigo":
        return "border-indigo-200 dark:border-indigo-800"
      case "teal":
        return "border-teal-200 dark:border-teal-800"
      default:
        return "border-purple-200 dark:border-purple-800"
    }
  }

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={cn(
        "flex flex-col h-full bg-white dark:bg-gray-950 rounded-xl shadow-lg overflow-hidden",
        `border ${getBorderColorClass(selectedColor)}`,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header
        className={cn(
          "sticky top-0 z-30 backdrop-blur-md transition-all duration-300 bg-white/90 dark:bg-gray-950/90",
          showToolbar ? "py-4" : "py-2",
        )}
      >
        <div className="flex items-center justify-between px-4 mb-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300")}
            onClick={onCancel}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {lastSaved && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-xs text-gray-500 dark:text-gray-400 flex items-center"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </motion.div>
              )}
            </AnimatePresence>

            <Tabs value={editorMode} onValueChange={(value) => setEditorMode(value as "write" | "preview")}>
              <TabsList className="h-8">
                <TabsTrigger value="write" className="text-xs px-3">
                  Write
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs px-3">
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className={cn("border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300")}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>

            <Button
              size="sm"
              onClick={handleSave}
              className={cn(
                "text-white",
                `bg-${selectedColor}-600 hover:bg-${selectedColor}-700 dark:bg-${selectedColor}-700 dark:hover:bg-${selectedColor}-600`,
              )}
              style={{
                backgroundColor: `var(--${selectedColor}-600)`,
                borderColor: `var(--${selectedColor}-600)`,
              }}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>

        <div className="px-4">
          <div className="relative group">
            <Input
              ref={titleInputRef}
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "text-3xl font-bold border-none bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none outline-none",
                "placeholder:text-gray-400 dark:placeholder:text-gray-600 placeholder:font-normal",
                "tracking-tight transition-all duration-200",
                getTextColorClass(selectedColor),
              )}
            />
            <AnimatePresence>
              {title && (
                <motion.div
                  className={cn("absolute -bottom-0.5 left-0 h-0.5 rounded-full", getColorClass(selectedColor))}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-4 mt-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 gap-1 text-xs",
                        getBorderColorClass(selectedColor),
                        getTextColorClass(selectedColor),
                      )}
                    >
                      <Palette className="h-3.5 w-3.5" />
                      <span className="capitalize">{selectedColor}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <div className="flex flex-wrap gap-1 max-w-[240px]">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          className={cn(
                            "w-7 h-7 rounded-full transition-transform",
                            color.class,
                            selectedColor === color.name
                              ? "scale-110 ring-2 ring-offset-2 ring-offset-background ring-gray-300 dark:ring-gray-700"
                              : "hover:scale-105",
                          )}
                          onClick={() => setSelectedColor(color.name)}
                          aria-label={`${color.name} color`}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Change note color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Tags</span>
                  {tags.length > 0 && (
                    <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-[10px]">
                      {tags.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Manage Tags</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                          `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/30`,
                          `text-${selectedColor}-800 dark:text-${selectedColor}-300`,
                        )}
                        style={{
                          backgroundColor: `var(--${selectedColor}-100)`,
                          color: `var(--${selectedColor}-800)`,
                        }}
                      >
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-600 dark:hover:text-red-400">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="text"
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      className="h-8 text-sm"
                    />
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="ml-auto flex items-center text-xs text-gray-500 dark:text-gray-400 gap-3">
            <div className="flex items-center">
              <span>{wordCount} words</span>
              <span className="mx-1">•</span>
              <span>{charCount} characters</span>
            </div>

            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-1"
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={cn(
                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                        getColorClass(selectedColor),
                      )}
                    ></span>
                    <span
                      className={cn("relative inline-flex rounded-full h-2 w-2", getColorClass(selectedColor))}
                    ></span>
                  </span>
                  <span>Typing...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <motion.div
        className={cn("border-t border-b flex-grow overflow-auto", getBorderColorClass(selectedColor))}
        ref={editorContainerRef}
        animate={{
          boxShadow: isTyping ? `inset 0 0 0 2px var(--${selectedColor}-500)` : "inset 0 0 0 1px transparent",
        }}
        transition={{ duration: 0.3 }}
        style={{ maxHeight: "calc(100vh - 16rem)" }} // Adjust based on header and footer heights
      >
        <AnimatePresence mode="wait">
          {editorMode === "write" ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  "sticky top-0 z-20 border-b transition-all duration-300",
                  getBorderColorClass(selectedColor),
                  showToolbar ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              >
                <div className="p-2 flex flex-wrap gap-1 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                      editor.isActive("bold")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("bold")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                      editor.isActive("italic")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("italic")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={cn(
                      editor.isActive("strike")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("strike")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="relative group">
                    <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 dark:border-gray-700 overflow-hidden">
                      <span className="h-3 w-3 rounded-sm bg-current" />
                    </span>
                    <input
                      type="color"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => {
                        editor.chain().focus().setColor(e.target.value).run()
                      }}
                    />
                  </Button>
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn(
                      editor.isActive("heading", { level: 1 })
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("heading", { level: 1 })
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn(
                      editor.isActive("heading", { level: 2 })
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("heading", { level: 2 })
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn(
                      editor.isActive("heading", { level: 3 })
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("heading", { level: 3 })
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn(
                      editor.isActive("bulletList")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("bulletList")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn(
                      editor.isActive("orderedList")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("orderedList")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={cn(
                      editor.isActive("taskList")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("taskList")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <CheckSquare className="h-4 w-4" />
                  </Button>
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={cn(
                      editor.isActive({ textAlign: "left" })
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive({ textAlign: "left" })
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={cn(
                      editor.isActive({ textAlign: "center" })
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive({ textAlign: "center" })
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={cn(
                      editor.isActive({ textAlign: "right" })
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive({ textAlign: "right" })
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn(
                      editor.isActive("blockquote")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("blockquote")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={cn(
                      editor.isActive("codeBlock")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("codeBlock")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const url = window.prompt("URL")
                      if (url) {
                        editor.chain().focus().setImage({ src: url }).run()
                      }
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const url = window.prompt("URL")
                      if (url) {
                        editor.chain().focus().toggleLink({ href: url }).run()
                      }
                    }}
                    className={cn(
                      editor.isActive("link")
                        ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                        : "",
                    )}
                    style={
                      editor.isActive("link")
                        ? {
                            backgroundColor: `var(--${selectedColor}-100)`,
                            color: `var(--${selectedColor}-800)`,
                          }
                        : {}
                    }
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 min-h-[400px] prose dark:prose-invert max-w-none">
                <EditorContent editor={editor} className="min-h-[400px] outline-none" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 min-h-[400px] prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="sticky bottom-0 p-4 flex justify-between items-center border-t bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => {
              if (window.confirm("Are you sure you want to discard this note?")) {
                onCancel()
              }
            }}
          >
            <Trash className="h-4 w-4 mr-1" />
            Discard
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1", getTextColorClass(selectedColor))}
            onClick={() => {
              // This would be where you'd implement AI assistance
              editor.chain().focus().insertContent("✨ AI generated content would appear here").run()
            }}
          >
            <Sparkles className="h-4 w-4" />
            AI Assist
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} className="border-gray-200 dark:border-gray-800">
            Cancel
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            className={cn(
              "text-white",
              `bg-${selectedColor}-600 hover:bg-${selectedColor}-700 dark:bg-${selectedColor}-700 dark:hover:bg-${selectedColor}-600`,
            )}
            style={{
              backgroundColor: `var(--${selectedColor}-600)`,
              borderColor: `var(--${selectedColor}-600)`,
            }}
          >
            <Save className="h-4 w-4 mr-1" />
            Save Note
          </Button>
        </div>
      </footer>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                editor.isActive("bold")
                  ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                  : "",
              )}
              style={
                editor.isActive("bold")
                  ? {
                      backgroundColor: `var(--${selectedColor}-100)`,
                      color: `var(--${selectedColor}-800)`,
                    }
                  : {}
              }
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                editor.isActive("italic")
                  ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                  : "",
              )}
              style={
                editor.isActive("italic")
                  ? {
                      backgroundColor: `var(--${selectedColor}-100)`,
                      color: `var(--${selectedColor}-800)`,
                    }
                  : {}
              }
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                editor.isActive("strike")
                  ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                  : "",
              )}
              style={
                editor.isActive("strike")
                  ? {
                      backgroundColor: `var(--${selectedColor}-100)`,
                      color: `var(--${selectedColor}-800)`,
                    }
                  : {}
              }
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative group">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 dark:border-gray-700 overflow-hidden">
                <span className="h-3 w-3 rounded-sm bg-current" />
              </span>
              <input
                type="color"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => {
                  editor.chain().focus().setColor(e.target.value).run()
                }}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const url = window.prompt("URL")
                if (url) {
                  editor.chain().focus().toggleLink({ href: url }).run()
                }
              }}
              className={cn(
                editor.isActive("link")
                  ? `bg-${selectedColor}-100 dark:bg-${selectedColor}-900/50 text-${selectedColor}-800 dark:text-${selectedColor}-300`
                  : "",
              )}
              style={
                editor.isActive("link")
                  ? {
                      backgroundColor: `var(--${selectedColor}-100)`,
                      color: `var(--${selectedColor}-800)`,
                    }
                  : {}
              }
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}
    </motion.div>
  )
}
