"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarLeft } from "../../../components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { TipTapEditor } from "@/components/tiptap-editor"
import { ChatInterface } from "@/components/chat-interface"
import {
  PenTool,
  Search,
  Plus,
  Clock,
  Star,
  MoreHorizontal,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  X,
  Trash2,
  Edit,
  Copy,
  Share2,
  MessageSquare,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

// Sample note data
const sampleNotes = [
  {
    id: 1,
    title: "Biology - Cell Structure",
    content:
      "The cell is the basic structural and functional unit of all living organisms. Cells consist of cytoplasm enclosed within a membrane, which contains many biomolecules such as proteins and nucleic acids. Most plant and animal cells are only visible under a light microscope, with dimensions between 1 and 100 micrometres.",
    tags: ["biology", "cells", "important"],
    date: "2 days ago",
    starred: true,
    course: "Biology 101",
    color: "green",
  },
  {
    id: 2,
    title: "Physics - Newton's Laws",
    content:
      "Newton's First Law: An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. Newton's Second Law: The acceleration of an object depends on the mass of the object and the amount of force applied. Newton's Third Law: For every action, there is an equal and opposite reaction.",
    tags: ["physics", "mechanics"],
    date: "1 week ago",
    starred: false,
    course: "Physics 201",
    color: "blue",
  },
  {
    id: 3,
    title: "Literature - Shakespeare Analysis",
    content:
      "Hamlet's famous soliloquy explores themes of existence, mortality, and action versus inaction. The phrase 'To be or not to be' introduces the central question of whether it is better to endure life's hardships or to end one's suffering through death. Shakespeare uses this monologue to delve into the psychological complexity of his protagonist.",
    tags: ["literature", "shakespeare"],
    date: "3 days ago",
    starred: true,
    course: "English Literature",
    color: "purple",
  },
  {
    id: 4,
    title: "Computer Science - Algorithms",
    content:
      "Sorting algorithms comparison: Quick Sort has an average time complexity of O(n log n) but can degrade to O(n²) in worst cases. Merge Sort maintains O(n log n) performance regardless of input but requires additional space. Bubble Sort is simple but inefficient with O(n²) complexity. Selection Sort and Insertion Sort also have O(n²) complexity but can be useful for small datasets.",
    tags: ["cs", "algorithms", "sorting"],
    date: "Yesterday",
    starred: false,
    course: "CS Fundamentals",
    color: "red",
  },
  {
    id: 5,
    title: "Mathematics - Calculus Formulas",
    content:
      "Integration by parts formula: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx. This is derived from the product rule for differentiation and is particularly useful for integrals where direct integration is difficult. Common applications include integrals containing products of algebraic and transcendental functions.",
    tags: ["math", "calculus", "formulas"],
    date: "4 days ago",
    starred: true,
    course: "Calculus II",
    color: "yellow",
  },
]

// Sample courses for filtering
const courses = ["All Courses", "Biology 101", "Physics 201", "English Literature", "CS Fundamentals", "Calculus II"]

export default function NotesPage() {
  const [notes, setNotes] = useState(sampleNotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [isEditing, setIsEditing] = useState(false)
  const [isChatting, setIsChatting] = useState(false)
  const [currentNote, setCurrentNote] = useState<any>(null)
  const [chatPrompt, setChatPrompt] = useState("")

  // Filter notes based on search term, active tab, course, and tags
  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "starred" && note.starred) ||
        (activeTab === "recent" && new Date(note.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))

      const matchesCourse = selectedCourse === "All Courses" || note.course === selectedCourse

      const matchesFilters = activeFilters.length === 0 || note.tags.some((tag) => activeFilters.includes(tag))

      return matchesSearch && matchesTab && matchesCourse && matchesFilters
    })
    .sort((a, b) => {
      // Sort by date (assuming newer items have "ago" in their date string)
      const dateA = a.date.includes("ago") ? -1 : 1
      const dateB = b.date.includes("ago") ? -1 : 1
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

  // Get all unique tags from notes
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)))

  // Toggle filter
  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Toggle star
  const toggleStar = (id: number) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, starred: !note.starred } : note)))
  }

  // Get color class based on note color
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      green: "border-l-green-500 bg-green-50 dark:bg-green-950/30 dark:border-l-green-700",
      blue: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-l-blue-700",
      purple: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/30 dark:border-l-purple-700",
      red: "border-l-red-500 bg-red-50 dark:bg-red-950/30 dark:border-l-red-700",
      yellow: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 dark:border-l-yellow-700",
    }
    return colorMap[color] || "border-l-purple-500 dark:border-l-purple-700"
  }

  // Handle new note
  const handleNewNote = () => {
    setCurrentNote(null)
    setIsEditing(true)
    setIsChatting(false)
  }

  // Handle edit note
  const handleEditNote = (note: any) => {
    setCurrentNote(note)
    setIsEditing(true)
    setIsChatting(false)
  }

  // Handle chat about note
  const handleChatAboutNote = (note: any) => {
    setCurrentNote(note)
    setChatPrompt(`Help me understand this note about ${note.title}`)
    setIsChatting(true)
    setIsEditing(false)
  }

  // Handle new chat
  const handleNewChat = () => {
    setCurrentNote(null)
    setChatPrompt("")
    setIsChatting(true)
    setIsEditing(false)
  }

  // Handle save note
  const handleSaveNote = (title: string, content: string, tags: string[]) => {
    if (currentNote) {
      // Edit existing note
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id
            ? {
                ...note,
                title,
                content,
                tags,
                date: "Just now",
              }
            : note,
        ),
      )
      toast({
        title: "Note updated",
        description: "Your note has been successfully updated.",
      })
    } else {
      // Create new note
      const newNote = {
        id: notes.length + 1,
        title: title || "Untitled Note",
        content,
        tags,
        date: "Just now",
        starred: false,
        course: selectedCourse === "All Courses" ? "General" : selectedCourse,
        color: "purple",
      }
      setNotes([newNote, ...notes])
      toast({
        title: "Note created",
        description: "Your new note has been successfully created.",
      })
    }
    setIsEditing(false)
    setCurrentNote(null)
  }

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false)
    setIsChatting(false)
    setCurrentNote(null)
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader title="Notes" description="Organize and access your study notes" />

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editor"
              className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="p-6 flex-1 overflow-hidden">
                <TipTapEditor
                  onSave={handleSaveNote}
                  onCancel={handleCancel}
                  initialTitle={currentNote?.title || ""}
                  initialContent={currentNote?.content || ""}
                  initialTags={currentNote?.tags || []}
                />
              </div>
            </motion.div>
          ) : isChatting ? (
            <motion.div
              key="chat"
              className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="p-6 flex-1 overflow-hidden">
                <ChatInterface onClose={handleCancel} initialPrompt={chatPrompt} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="notes-list"
              className="flex flex-col p-6 gap-6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                      <PenTool className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">Your Notes</h1>
                      <p className="text-sm text-muted-foreground">Organize and access your study notes</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search notes..."
                        className="pl-9 rounded-full border shadow-sm focus-visible:ring-1 focus-visible:ring-purple-300 dark:focus-visible:ring-purple-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 rounded-full"
                      onClick={handleNewNote}
                    >
                      <Plus className="mr-2 h-4 w-4" /> New Note
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 rounded-full"
                      onClick={handleNewChat}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" /> Ask AI
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 rounded-full">
                        <Filter className="h-3.5 w-3.5 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <div className="p-2">
                        <p className="text-xs font-medium mb-2">Filter by tags</p>
                        <div className="flex flex-wrap gap-1">
                          {allTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={activeFilters.includes(tag) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleFilter(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setActiveFilters([])}>Clear all filters</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 rounded-full">
                        <PenTool className="h-3.5 w-3.5 mr-2" />
                        {selectedCourse}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <ScrollArea className="h-72">
                        {courses.map((course) => (
                          <DropdownMenuItem
                            key={course}
                            onClick={() => setSelectedCourse(course)}
                            className={selectedCourse === course ? "bg-muted" : ""}
                          >
                            {course}
                          </DropdownMenuItem>
                        ))}
                      </ScrollArea>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full"
                    onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                  >
                    {sortOrder === "asc" ? (
                      <>
                        <SortAsc className="h-3.5 w-3.5 mr-2" /> Oldest first
                      </>
                    ) : (
                      <>
                        <SortDesc className="h-3.5 w-3.5 mr-2" /> Newest first
                      </>
                    )}
                  </Button>

                  <div className="ml-auto flex items-center border rounded-md overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 rounded-none px-2 ${viewMode === "grid" ? "bg-muted" : ""}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 rounded-none px-2 ${viewMode === "list" ? "bg-muted" : ""}`}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {activeFilters.map((filter) => (
                      <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                        {filter}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter(filter)} />
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveFilters([])}>
                      Clear all
                    </Button>
                  </div>
                )}
              </div>

              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
                  >
                    All Notes
                  </TabsTrigger>
                  <TabsTrigger
                    value="starred"
                    className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
                  >
                    <Star className="mr-1 h-4 w-4" /> Starred
                  </TabsTrigger>
                  <TabsTrigger
                    value="recent"
                    className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
                  >
                    <Clock className="mr-1 h-4 w-4" /> Recent
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <AnimatePresence>
                    {filteredNotes.length > 0 ? (
                      viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredNotes.map((note) => (
                            <motion.div
                              key={note.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3 }}
                              whileHover={{ y: -5 }}
                              className="note-card"
                            >
                              <Card
                                className={`h-full border-l-4 ${getColorClass(note.color)} hover:shadow-md transition-all duration-300`}
                              >
                                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                                  <div>
                                    <CardTitle className="text-lg font-medium">{note.title}</CardTitle>
                                    <p className="text-xs text-muted-foreground">
                                      {note.course} • {note.date}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-yellow-400 dark:text-yellow-500"
                                      onClick={() => toggleStar(note.id)}
                                    >
                                      <Star
                                        className={`h-4 w-4 ${note.starred ? "fill-yellow-400 dark:fill-yellow-500" : ""}`}
                                      />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEditNote(note)}>
                                          <Edit className="h-4 w-4 mr-2" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleChatAboutNote(note)}>
                                          <MessageSquare className="h-4 w-4 mr-2" /> Ask AI about this
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Copy className="h-4 w-4 mr-2" /> Duplicate
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Share2 className="h-4 w-4 mr-2" /> Share
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm line-clamp-3">{note.content}</p>
                                  <div className="flex flex-wrap gap-1 mt-3">
                                    {note.tags.map((tag, i) => (
                                      <Badge
                                        key={i}
                                        variant="outline"
                                        className="text-xs cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/50"
                                        onClick={() => toggleFilter(tag)}
                                      >
                                        #{tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {filteredNotes.map((note) => (
                            <motion.div
                              key={note.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                              className="note-card"
                            >
                              <Card
                                className={`border-l-4 ${getColorClass(note.color)} hover:shadow-sm transition-all duration-300`}
                              >
                                <div className="flex p-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-medium truncate">{note.title}</h3>
                                      <div className="flex items-center gap-1 ml-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-yellow-400 dark:text-yellow-500"
                                          onClick={() => toggleStar(note.id)}
                                        >
                                          <Star
                                            className={`h-4 w-4 ${
                                              note.starred ? "fill-yellow-400 dark:fill-yellow-500" : ""
                                            }`}
                                          />
                                        </Button>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditNote(note)}>
                                              <Edit className="h-4 w-4 mr-2" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleChatAboutNote(note)}>
                                              <MessageSquare className="h-4 w-4 mr-2" /> Ask AI about this
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Copy className="h-4 w-4 mr-2" /> Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Share2 className="h-4 w-4 mr-2" /> Share
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                                      <span>{note.course}</span>
                                      <span className="mx-2">•</span>
                                      <span>{note.date}</span>
                                    </div>
                                    <p className="text-sm line-clamp-2 mt-2">{note.content}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {note.tags.map((tag, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="text-xs cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/50"
                                          onClick={() => toggleFilter(tag)}
                                        >
                                          #{tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="rounded-full bg-muted p-3">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No notes found</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md">
                          We couldn't find any notes matching your search criteria. Try adjusting your filters or create
                          a new note.
                        </p>
                        <Button
                          className="mt-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 rounded-full"
                          onClick={handleNewNote}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Create New Note
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  )
}
