"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarLeft } from "../../../components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Upload,
  Download,
  Share2,
  MoreHorizontal,
  BookOpen,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Calendar,
  X,
  Trash2,
  FileIcon as FilePdf,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// Sample books data - PDF format
const booksData = [
  {
    id: 1,
    title: "Introduction to Biology",
    author: "Dr. Jane Smith",
    publisher: "Academic Press",
    year: "2022",
    size: "12.5 MB",
    date: "2 weeks ago",
    course: "Biology 101",
    icon: FilePdf,
    tags: ["textbook", "biology", "introduction"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 2,
    title: "Physics: Principles and Problems",
    author: "Dr. Robert Johnson",
    publisher: "Science Publications",
    year: "2021",
    size: "15.2 MB",
    date: "3 days ago",
    course: "Physics 201",
    icon: FilePdf,
    tags: ["textbook", "physics", "principles"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 3,
    title: "Chemistry: The Central Science",
    author: "Dr. Maria Garcia",
    publisher: "Chemical Education",
    year: "2020",
    size: "18.8 MB",
    date: "1 week ago",
    course: "Chemistry 101",
    icon: FilePdf,
    tags: ["textbook", "chemistry", "science"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 4,
    title: "Shakespeare: Complete Works",
    author: "William Shakespeare",
    publisher: "Literary Classics",
    year: "2019",
    size: "22.2 MB",
    date: "Yesterday",
    course: "English Literature",
    icon: FilePdf,
    tags: ["literature", "shakespeare", "classics"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 5,
    title: "Calculus: Early Transcendentals",
    author: "Dr. Thomas Wright",
    publisher: "Math Press",
    year: "2021",
    size: "16.5 MB",
    date: "4 days ago",
    course: "Calculus II",
    icon: FilePdf,
    tags: ["textbook", "calculus", "mathematics"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 6,
    title: "Human Anatomy and Physiology",
    author: "Dr. Sarah Chen",
    publisher: "Medical Education",
    year: "2020",
    size: "25.7 MB",
    date: "1 month ago",
    course: "Human Anatomy",
    icon: FilePdf,
    tags: ["textbook", "anatomy", "medical"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 7,
    title: "Spanish Grammar and Vocabulary",
    author: "Prof. Carlos Mendez",
    publisher: "Language Learning",
    year: "2022",
    size: "10.3 MB",
    date: "2 days ago",
    course: "Spanish 101",
    icon: FilePdf,
    tags: ["textbook", "spanish", "language"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 8,
    title: "Algorithms and Data Structures",
    author: "Dr. Alan Turing",
    publisher: "Computer Science Press",
    year: "2021",
    size: "14.1 MB",
    date: "1 week ago",
    course: "CS Fundamentals",
    icon: FilePdf,
    tags: ["textbook", "algorithms", "computer science"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 9,
    title: "Statistical Methods for Research",
    author: "Dr. Emily Watson",
    publisher: "Statistics Academy",
    year: "2020",
    size: "12.3 MB",
    date: "5 days ago",
    course: "Statistics",
    icon: FilePdf,
    tags: ["textbook", "statistics", "research"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 10,
    title: "Web Development: A Comprehensive Guide",
    author: "Dr. Michael Lee",
    publisher: "Tech Education",
    year: "2022",
    size: "17.8 MB",
    date: "3 days ago",
    course: "Web Development",
    icon: FilePdf,
    tags: ["textbook", "web", "development"],
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
]

// Sample courses for filtering
const courses = [
  "All Courses",
  "Biology 101",
  "Physics 201",
  "Chemistry 101",
  "English Literature",
  "Calculus II",
  "Human Anatomy",
  "Spanish 101",
  "CS Fundamentals",
  "Statistics",
  "Web Development",
]

export default function MaterialsPage() {
  const [books, setBooks] = useState(booksData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [downloadingFile, setDownloadingFile] = useState<number | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [uploadFileName, setUploadFileName] = useState("")
  const [uploadFileSize, setUploadFileSize] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter books based on search term, selected course, and active filters
  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCourse = selectedCourse === "All Courses" || book.course === selectedCourse
      const matchesFilters = activeFilters.length === 0 || book.tags.some((tag) => activeFilters.includes(tag))

      return matchesSearch && matchesCourse && matchesFilters
    })
    .sort((a, b) => {
      // Sort by date (assuming newer items have "ago" in their date string)
      const dateA = a.date.includes("ago") ? -1 : 1
      const dateB = b.date.includes("ago") ? -1 : 1
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

  // Get all unique tags from books
  const allTags = Array.from(new Set(books.flatMap((book) => book.tags)))

  // Toggle filter
  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Handle file download
  const handleDownload = (id: number) => {
    setDownloadingFile(id)
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDownloadingFile(null)
            const book = books.find((b) => b.id === id)
            if (book) {
              toast({
                title: "Download complete",
                description: `${book.title} has been downloaded successfully.`,
                action: <ToastAction altText="Open file">Open file</ToastAction>,
              })
            }
          }, 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 300)
  }

  // Handle file upload
  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setUploadFileName(file.name)
      setUploadFileSize(formatFileSize(file.size))
      simulateFileUpload()
    }
  }

  const simulateFileUpload = () => {
    setUploadingFile(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUploadingFile(false)
            setUploadDialogOpen(false)

            // Add a new book to the list
            const newBook = {
              id: books.length + 1,
              title: uploadFileName.replace(/\.[^/.]+$/, "") || "New Book",
              author: "Uploaded by You",
              publisher: "Personal Library",
              year: new Date().getFullYear().toString(),
              size: uploadFileSize || "3.2 MB",
              date: "Just now",
              course: selectedCourse === "All Courses" ? "General" : selectedCourse,
              icon: FilePdf,
              tags: ["pdf", "uploaded"],
              color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
              iconColor: "text-red-600 dark:text-red-400",
            }

            setBooks((prev) => [newBook, ...prev])

            toast({
              title: "Upload complete",
              description: `${uploadFileName || "New book"} has been uploaded successfully.`,
            })
          }, 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 5
      })
    }, 300)
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader title="Study Materials" description="Access and organize your learning resources" />

        <div className="flex flex-col p-6 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Books & PDFs</h1>
                  <p className="text-sm text-muted-foreground">
                    Access your digital library of textbooks and resources
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search books..."
                    className="pl-9 rounded-full border shadow-sm focus-visible:ring-1 focus-visible:ring-purple-300 dark:focus-visible:ring-purple-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
                      <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload New Book</DialogTitle>
                      <DialogDescription>Upload a new PDF book to your digital library.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {uploadingFile ? (
                        <div className="py-6">
                          <div className="mb-2 flex justify-between text-sm">
                            <span>{uploadFileName || "document.pdf"}</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-2">
                            Uploading {uploadFileSize || "3.2 MB"}...
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="border-2 border-dashed rounded-lg p-12 text-center">
                            <div className="flex justify-center mb-4">
                              <FilePdf className="h-10 w-10 text-red-500" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Drag and drop your PDF files here</h3>
                            <p className="text-sm text-muted-foreground mb-4">or click to browse your files</p>
                            <Button variant="outline" onClick={handleFileUpload}>
                              Browse Files
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              onChange={handleFileInputChange}
                              accept=".pdf"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Course</label>
                            <select className="w-full mt-1 p-2 border rounded-md">
                              {courses
                                .filter((c) => c !== "All Courses")
                                .map((course) => (
                                  <option key={course} value={course}>
                                    {course}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Tags (comma separated)</label>
                            <Input placeholder="e.g. textbook, reference, important" />
                          </div>
                        </>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setUploadDialogOpen(false)} disabled={uploadingFile}>
                        Cancel
                      </Button>
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                        onClick={simulateFileUpload}
                        disabled={uploadingFile}
                      >
                        Upload
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                    <BookOpen className="h-3.5 w-3.5 mr-2" />
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

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-900/50 dark:data-[state=active]:text-indigo-300"
              >
                All Books
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-900/50 dark:data-[state=active]:text-indigo-300"
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="shared"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-900/50 dark:data-[state=active]:text-indigo-300"
              >
                Shared with Me
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <AnimatePresence>
                {filteredBooks.length > 0 ? (
                  viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: -5 }}
                          className="book-card"
                        >
                          <Card
                            className={`h-full hover:shadow-md transition-all duration-300 overflow-hidden border ${book.color}`}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg ${book.color}`}>
                                  <book.icon className={`h-6 w-6 ${book.iconColor}`} />
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleDownload(book.id)}>
                                      <Download className="h-4 w-4 mr-2" /> Download
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
                              <h3 className="font-medium line-clamp-1">{book.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">by {book.author}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-muted-foreground">{book.course}</p>
                                <p className="text-xs text-muted-foreground">{book.year}</p>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {book.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <p className="text-xs text-muted-foreground">{book.size}</p>
                                <p className="text-xs text-muted-foreground flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" /> {book.date}
                                </p>
                              </div>

                              {downloadingFile === book.id && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Downloading...</span>
                                    <span>{downloadProgress}%</span>
                                  </div>
                                  <Progress value={downloadProgress} className="h-1.5" />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {filteredBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="py-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${book.color}`}>
                                <book.icon className={`h-6 w-6 ${book.iconColor}`} />
                              </div>
                              <div>
                                <h3 className="font-medium">{book.title}</h3>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                                  <p className="text-sm text-muted-foreground">• {book.year}</p>
                                  <p className="text-sm text-muted-foreground">• {book.course}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {downloadingFile === book.id ? (
                                <div className="w-24">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{downloadProgress}%</span>
                                  </div>
                                  <Progress value={downloadProgress} className="h-1.5" />
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-indigo-600 dark:text-indigo-400"
                                  onClick={() => handleDownload(book.id)}
                                >
                                  <Download className="h-4 w-4 mr-1" /> Download
                                </Button>
                              )}

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleDownload(book.id)}>
                                    <Download className="h-4 w-4 mr-2" /> Download
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
                        </motion.div>
                      ))}
                    </div>
                  )
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <h2 className="text-xl font-semibold">No books found</h2>
                    <p className="text-muted-foreground">Adjust your search or filters to find books.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              <p>This is the recent books tab content.</p>
            </TabsContent>

            <TabsContent value="shared" className="mt-6">
              <p>This is content for books shared with you.</p>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
