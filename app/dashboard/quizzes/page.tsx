"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookCheck, Search, Trophy } from "lucide-react"
import { Input } from "@/components/ui/input"

// Sample quizzes data
const quizzesData = [
  {
    id: 1,
    title: "Biology Midterm Practice Quiz",
    description: "Test your knowledge of chapters 1-5",
    course: "Biology 101",
    questions: 25,
    timeLimit: "30 minutes",
    difficulty: "Medium",
    dueDate: "Oct 15, 2023",
    status: "available",
    progress: 0,
    score: null,
  },
  {
    id: 2,
    title: "Physics Formulas Quiz",
    description: "Review key formulas from mechanics",
    course: "Physics 201",
    questions: 15,
    timeLimit: "20 minutes",
    difficulty: "Hard",
    dueDate: "Oct 10, 2023",
    status: "completed",
    progress: 100,
    score: 85,
  },
  {
    id: 3,
    title: "Literature Terms Quiz",
    description: "Test your knowledge of literary devices",
    course: "English Literature",
    questions: 20,
    timeLimit: "25 minutes",
    difficulty: "Easy",
    dueDate: "Oct 20, 2023",
    status: "in-progress",
    progress: 45,
    score: null,
  },
  {
    id: 4,
    title: "Calculus Derivatives Quiz",
    description: "Practice derivative problems",
    course: "Calculus II",
    questions: 10,
    timeLimit: "15 minutes",
    difficulty: "Medium",
    dueDate: "Oct 12, 2023",
    status: "available",
    progress: 0,
    score: null,
  },
  {
    id: 5,
    title: "Spanish Vocabulary Quiz",
    description: "Test your knowledge of basic Spanish vocabulary",
    course: "Spanish 101",
    questions: 30,
    timeLimit: "35 minutes",
    difficulty: "Easy",
    dueDate: "Oct 18, 2023",
    status: "completed",
    progress: 100,
    score: 92,
  },
  {
    id: 6,
    title: "Computer Science Algorithms Quiz",
    description: "Test your understanding of basic algorithms",
    course: "CS Fundamentals",
    questions: 15,
    timeLimit: "25 minutes",
    difficulty: "Hard",
    dueDate: "Oct 22, 2023",
    status: "available",
    progress: 0,
    score: null,
  },
]

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState(quizzesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter quizzes based on search term and active tab
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.course.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "available") return matchesSearch && quiz.status === "available"
    if (activeTab === "inProgress") return matchesSearch && quiz.status === "in-progress"
    if (activeTab === "completed") return matchesSearch && quiz.status === "completed"

    return matchesSearch
  })

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "in-progress":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Get button text based on quiz status
  const getButtonText = (status: string) => {
    switch (status) {
      case "available":
        return "Start Quiz"
      case "in-progress":
        return "Continue"
      case "completed":
        return "Review"
      default:
        return "View"
    }
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader title="Quizzes" description="Test your knowledge and track your progress" />

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                <BookCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Quizzes</h1>
                <p className="text-sm text-muted-foreground">Test your knowledge and track your progress</p>
              </div>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                className="pl-9 rounded-full border shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Available Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quizzes.filter((quiz) => quiz.status === "available").length}</div>
                <p className="text-xs text-muted-foreground mt-1">Quizzes ready to take</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {quizzes.filter((quiz) => quiz.status === "in-progress").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Quizzes you've started</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quizzes.filter((quiz) => quiz.status === "completed").length}</div>
                <p className="text-xs text-muted-foreground mt-1">Quizzes you've finished</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
              >
                All Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="available"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
              >
                Available
              </TabsTrigger>
              <TabsTrigger
                value="inProgress"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/50 dark:data-[state=active]:text-purple-300"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge className={getStatusColor(quiz.status)}>
                            {quiz.status === "in-progress"
                              ? "In Progress"
                              : quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                          </Badge>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <CardTitle className="mt-2">{quiz.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{quiz.description}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Course:</span>
                            <span className="font-medium">{quiz.course}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Questions:</span>
                            <span className="font-medium">{quiz.questions}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Time Limit:</span>
                            <span className="font-medium">{quiz.timeLimit}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span className="font-medium">{quiz.dueDate}</span>
                          </div>

                          {quiz.status === "in-progress" && (
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span className="text-muted-foreground">Progress:</span>
                                <span className="font-medium">{quiz.progress}%</span>
                              </div>
                              <Progress value={quiz.progress} className="h-2" />
                            </div>
                          )}

                          {quiz.status === "completed" && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Score:</span>
                              <div className="flex items-center">
                                <span className="font-medium mr-1">{quiz.score}%</span>
                                {quiz.score && quiz.score >= 90 && <Trophy className="h-4 w-4 text-yellow-500" />}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                          {getButtonText(quiz.status)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold">No quizzes found</h2>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="available" className="mt-6">
              {/* Same structure as "all" tab, filtered by available quizzes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge className={getStatusColor(quiz.status)}>
                            {quiz.status === "in-progress"
                              ? "In Progress"
                              : quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                          </Badge>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <CardTitle className="mt-2">{quiz.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{quiz.description}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Course:</span>
                            <span className="font-medium">{quiz.course}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Questions:</span>
                            <span className="font-medium">{quiz.questions}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Time Limit:</span>
                            <span className="font-medium">{quiz.timeLimit}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span className="font-medium">{quiz.dueDate}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                          {getButtonText(quiz.status)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold">No available quizzes found</h2>
                  <p className="text-muted-foreground">Try adjusting your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="inProgress" className="mt-6">
              {/* Same structure as "all" tab, filtered by in-progress quizzes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge className={getStatusColor(quiz.status)}>
                            {quiz.status === "in-progress"
                              ? "In Progress"
                              : quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                          </Badge>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <CardTitle className="mt-2">{quiz.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{quiz.description}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Course:</span>
                            <span className="font-medium">{quiz.course}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Questions:</span>
                            <span className="font-medium">{quiz.questions}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Time Limit:</span>
                            <span className="font-medium">{quiz.timeLimit}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span className="font-medium">{quiz.dueDate}</span>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-muted-foreground">Progress:</span>
                              <span className="font-medium">{quiz.progress}%</span>
                            </div>
                            <Progress value={quiz.progress} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                          {getButtonText(quiz.status)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold">No in-progress quizzes found</h2>
                  <p className="text-muted-foreground">Try starting a new quiz from the Available tab.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              {/* Same structure as "all" tab, filtered by completed quizzes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge className={getStatusColor(quiz.status)}>
                            {quiz.status === "in-progress"
                              ? "In Progress"
                              : quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                          </Badge>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <CardTitle className="mt-2">{quiz.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{quiz.description}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Course:</span>
                            <span className="font-medium">{quiz.course}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Questions:</span>
                            <span className="font-medium">{quiz.questions}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Time Limit:</span>
                            <span className="font-medium">{quiz.timeLimit}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span className="font-medium">{quiz.dueDate}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Score:</span>
                            <div className="flex items-center">
                              <span className="font-medium mr-1">{quiz.score}%</span>
                              {quiz.score && quiz.score >= 90 && <Trophy className="h-4 w-4 text-yellow-500" />}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                          {getButtonText(quiz.status)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold">No completed quizzes found</h2>
                  <p className="text-muted-foreground">Complete some quizzes to see them here.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
