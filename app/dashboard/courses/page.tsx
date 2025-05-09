"use client"

import { useState } from "react"
import { SidebarLeft } from "../../../components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, Star, Filter, ChevronDown, Play, Users, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning algorithms and applications",
      image: "/placeholder.svg?height=200&width=400",
      instructor: {
        name: "Dr. Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 65,
      duration: "8 weeks",
      level: "Intermediate",
      category: "Computer Science",
      enrolled: 1243,
      rating: 4.8,
      status: "in-progress",
      nextLesson: {
        title: "Neural Networks Fundamentals",
        date: "Today",
        time: "3:00 PM",
      },
    },
    {
      id: 2,
      title: "Advanced Calculus",
      description: "Dive deep into multivariable calculus, differential equations, and applications",
      image: "/placeholder.svg?height=200&width=400",
      instructor: {
        name: "Prof. Michael Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 32,
      duration: "12 weeks",
      level: "Advanced",
      category: "Mathematics",
      enrolled: 876,
      rating: 4.6,
      status: "in-progress",
      nextLesson: {
        title: "Partial Derivatives",
        date: "Tomorrow",
        time: "10:00 AM",
      },
    },
    {
      id: 3,
      title: "Modern World History",
      description: "Explore major historical events and their impact on contemporary global issues",
      image: "/placeholder.svg?height=200&width=400",
      instructor: {
        name: "Dr. Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 100,
      duration: "10 weeks",
      level: "Beginner",
      category: "History",
      enrolled: 1567,
      rating: 4.9,
      status: "completed",
      certificate: true,
    },
    {
      id: 4,
      title: "Organic Chemistry Fundamentals",
      description: "Master the principles of organic chemistry and molecular structures",
      image: "/placeholder.svg?height=200&width=400",
      instructor: {
        name: "Prof. David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 0,
      duration: "14 weeks",
      level: "Intermediate",
      category: "Chemistry",
      enrolled: 932,
      rating: 4.7,
      status: "not-started",
      startDate: "Next Monday",
    },
    {
      id: 5,
      title: "Digital Marketing Strategies",
      description: "Learn effective digital marketing techniques for the modern business landscape",
      image: "/placeholder.svg?height=200&width=400",
      instructor: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 78,
      duration: "6 weeks",
      level: "Intermediate",
      category: "Business",
      enrolled: 2134,
      rating: 4.5,
      status: "in-progress",
      nextLesson: {
        title: "Social Media Analytics",
        date: "Wednesday",
        time: "2:30 PM",
      },
    },
    {
      id: 6,
      title: "Introduction to Psychology",
      description: "Explore the fundamentals of human behavior and mental processes",
      image: "/placeholder.svg?height=200&width=400",
      instructor: {
        name: "Dr. Robert Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 0,
      duration: "8 weeks",
      level: "Beginner",
      category: "Psychology",
      enrolled: 1876,
      rating: 4.8,
      status: "not-started",
      startDate: "Next Tuesday",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true
    if (activeTab === "in-progress") return course.status === "in-progress"
    if (activeTab === "completed") return course.status === "completed"
    if (activeTab === "not-started") return course.status === "not-started"
    return true
  })

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader />
        <div className="p-6 bg-gradient-to-b from-white to-purple-50/30 dark:from-gray-950 dark:to-purple-950/10 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">My Courses</h1>
                <p className="text-muted-foreground mt-1">Continue your learning journey</p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-9 w-full md:w-[250px] rounded-full bg-white dark:bg-gray-800"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    <DropdownMenuItem>Computer Science</DropdownMenuItem>
                    <DropdownMenuItem>Mathematics</DropdownMenuItem>
                    <DropdownMenuItem>History</DropdownMenuItem>
                    <DropdownMenuItem>Chemistry</DropdownMenuItem>
                    <DropdownMenuItem>Business</DropdownMenuItem>
                    <DropdownMenuItem>Psychology</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="bg-white dark:bg-gray-800 border">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="not-started">Not Started</TabsTrigger>
              </TabsList>
              <TabsContent value="all"></TabsContent>
              <TabsContent value="in-progress"></TabsContent>
              <TabsContent value="completed"></TabsContent>
              <TabsContent value="not-started"></TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        variant="outline"
                        className={`
                          ${course.status === "in-progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                          ${course.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""}
                          ${course.status === "not-started" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" : ""}
                        `}
                      >
                        {course.status === "in-progress" && "In Progress"}
                        {course.status === "completed" && "Completed"}
                        {course.status === "not-started" && "Not Started"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={course.instructor.avatar || "/placeholder.svg"}
                          alt={course.instructor.name}
                        />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{course.instructor.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.enrolled.toLocaleString()} students</span>
                      </div>
                    </div>
                    {course.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    {course.status === "in-progress" && (
                      <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
                        <Play className="h-4 w-4" />
                        Continue Learning
                      </Button>
                    )}
                    {course.status === "completed" && (
                      <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <Award className="h-4 w-4" />
                        View Certificate
                      </Button>
                    )}
                    {course.status === "not-started" && (
                      <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                        <BookOpen className="h-4 w-4" />
                        Start Course
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                <p className="mt-2 text-muted-foreground">
                  {activeTab === "in-progress" && "You don't have any courses in progress."}
                  {activeTab === "completed" && "You haven't completed any courses yet."}
                  {activeTab === "not-started" && "You don't have any courses to start."}
                </p>
                <Button className="mt-4">Browse Courses</Button>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
