"use client"

import { useState, useEffect } from "react"
import { format, startOfWeek, addDays } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Plus, Trash2, Edit2, Clock, BookOpen } from "lucide-react"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Define the Task interface
interface Task {
  id: string
  title: string
  day: number // 0-6 for Monday-Sunday
  time?: string
  subject?: string
  completed: boolean
}

// Days of the week
const DAYS = ["Mon", "Tues", "Wed", "Thurs", "Friday", "Sat", "Sun"]
const FULL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function StudyPlanPage() {
  // State for tasks
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

  // State for task dialog
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completed">>({
    title: "",
    day: 0,
    time: "",
    subject: "",
  })

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("studyPlanTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      // Sample tasks if none exist
      const sampleTasks: Task[] = [
        { id: "1", title: "Read Chapter 5", day: 0, subject: "Literature", completed: true },
        { id: "2", title: "Complete math exercises", day: 0, subject: "Mathematics", time: "3:00 PM", completed: true },
        { id: "3", title: "History essay research", day: 0, subject: "History", completed: false },
        { id: "4", title: "Review biology notes", day: 0, subject: "Biology", completed: false },
        { id: "5", title: "Write history essay", day: 0, subject: "History", time: "4:30 PM", completed: false },
        { id: "6", title: "Work on group project", day: 0, subject: "Computer Science", completed: false },
        { id: "7", title: "Study for math quiz", day: 0, subject: "Mathematics", completed: false },
        { id: "8", title: "Biology lab preparation", day: 3, subject: "Biology", time: "2:00 PM", completed: false },
      ]
      setTasks(sampleTasks)
      localStorage.setItem("studyPlanTasks", JSON.stringify(sampleTasks))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studyPlanTasks", JSON.stringify(tasks))
  }, [tasks])

  // Calculate progress
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Handle adding a new task
  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      day: newTask.day,
      time: newTask.time,
      subject: newTask.subject,
      completed: false,
    }

    setTasks([...tasks, task])
    setIsAddTaskOpen(false)
    setNewTask({ title: "", day: 0, time: "", subject: "" })
  }

  // Handle updating a task
  const handleUpdateTask = () => {
    if (!currentTask) return

    setTasks(tasks.map((task) => (task.id === currentTask.id ? currentTask : task)))
    setIsEditTaskOpen(false)
    setCurrentTask(null)
  }

  // Handle deleting a task
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
    setIsEditTaskOpen(false)
    setCurrentTask(null)
  }

  // Handle toggling task completion
  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Handle editing a task
  const handleEditTask = (task: Task) => {
    setCurrentTask(task)
    setIsEditTaskOpen(true)
  }

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prevDate) => addDays(prevDate, -7))
  }

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentWeekStart((prevDate) => addDays(prevDate, 7))
  }

  // Format the week range for display
  const weekRange = `${format(currentWeekStart, "MMMM d")} – ${format(addDays(currentWeekStart, 6), "MMMM d")}`

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <div className="min-h-screen bg-white">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-400 h-16 rounded-t-xl"></div>

          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Student Study Plan</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {progressPercentage}% Complete
                </Badge>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>
                  {completedTasks} of {totalTasks} tasks completed
                </span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Weekly calendar */}
            <div className="bg-white rounded-xl border shadow-sm mb-6">
              {/* Week selector */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="text-xl font-medium">{FULL_DAYS[0]}</div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <span className="text-sm font-medium">{weekRange}</span>
                  <Button variant="ghost" size="icon" onClick={goToNextWeek}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Days header */}
              <div className="grid grid-cols-7 border-b">
                {DAYS.map((day, index) => (
                  <div key={day} className="text-center py-3 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Tasks grid */}
              <div className="grid grid-cols-7 min-h-[500px]">
                {DAYS.map((_, dayIndex) => (
                  <div key={dayIndex} className="border-r last:border-r-0 p-2">
                    <div className="space-y-2">
                      <AnimatePresence>
                        {tasks
                          .filter((task) => task.day === dayIndex)
                          .map((task) => (
                            <motion.div
                              key={task.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              className={`flex items-start gap-2 p-2 rounded-md ${
                                task.completed ? "bg-gray-50" : "bg-white"
                              } hover:bg-gray-50 transition-colors border`}
                            >
                              <button
                                onClick={() => handleToggleComplete(task.id)}
                                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center ${
                                  task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300"
                                }`}
                              >
                                {task.completed && <Check className="h-3 w-3" />}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div
                                  className={`font-medium text-sm ${
                                    task.completed ? "text-gray-500 line-through" : ""
                                  }`}
                                >
                                  {task.title}
                                </div>
                                {(task.time || task.subject) && (
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    {task.time && (
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {task.time}
                                      </div>
                                    )}
                                    {task.subject && (
                                      <div className="flex items-center">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        {task.subject}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleEditTask(task)}
                                className="opacity-0 group-hover:opacity-100 hover:text-blue-500"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ))}
                      </AnimatePresence>

                      {/* Add task button within each day */}
                      <button
                        onClick={() => {
                          setNewTask((prev) => ({ ...prev, day: dayIndex }))
                          setIsAddTaskOpen(true)
                        }}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm w-full p-2"
                      >
                        <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center">
                          <Plus className="h-3 w-3" />
                        </div>
                        Add task
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Task button (floating) */}
            <div className="fixed bottom-8 right-8">
              <Button
                onClick={() => setIsAddTaskOpen(true)}
                className="rounded-full h-14 px-6 bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Task
              </Button>
            </div>
          </div>
        </div>

        {/* Add Task Dialog */}
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-day">Day</Label>
                <Select
                  value={newTask.day.toString()}
                  onValueChange={(value) => setNewTask({ ...newTask, day: Number.parseInt(value) })}
                >
                  <SelectTrigger id="task-day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {FULL_DAYS.map((day, index) => (
                      <SelectItem key={day} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-time">Time (Optional)</Label>
                <Input
                  id="task-time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  placeholder="e.g. 3:00 PM"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-subject">Subject (Optional)</Label>
                <Input
                  id="task-subject"
                  value={newTask.subject}
                  onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  placeholder="e.g. Mathematics"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask} disabled={!newTask.title}>
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            {currentTask && (
              <>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-title">Task Title</Label>
                    <Input
                      id="edit-task-title"
                      value={currentTask.title}
                      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-day">Day</Label>
                    <Select
                      value={currentTask.day.toString()}
                      onValueChange={(value) => setCurrentTask({ ...currentTask, day: Number.parseInt(value) })}
                    >
                      <SelectTrigger id="edit-task-day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {FULL_DAYS.map((day, index) => (
                          <SelectItem key={day} value={index.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-time">Time (Optional)</Label>
                    <Input
                      id="edit-task-time"
                      value={currentTask.time || ""}
                      onChange={(e) => setCurrentTask({ ...currentTask, time: e.target.value })}
                      placeholder="e.g. 3:00 PM"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-subject">Subject (Optional)</Label>
                    <Input
                      id="edit-task-subject"
                      value={currentTask.subject || ""}
                      onChange={(e) => setCurrentTask({ ...currentTask, subject: e.target.value })}
                      placeholder="e.g. Mathematics"
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-between">
                  <Button variant="destructive" onClick={() => handleDeleteTask(currentTask.id)} className="mr-auto">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => setIsEditTaskOpen(false)} className="mr-2">
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateTask}>Save Changes</Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
