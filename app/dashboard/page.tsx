"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SidebarLeft } from "../../components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsDialog } from "@/components/settings-dialog"
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  CupSoda,
  GraduationCap,
  Heart,
  LineChart,
  MessageCircle,
  MoonStar,
  Settings,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Trophy,
  User,
  Zap,
  Check,
} from "lucide-react"

export default function Page() {
  const statsRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [timeOfDay, setTimeOfDay] = useState("")
  const [quote, setQuote] = useState({ text: "", author: "" })
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Animation for progress bars
  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500)
    return () => clearTimeout(timer)
  }, [])

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 18) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")
  }, [])

  // Set inspiring quote
  useEffect(() => {
    const quotes = [
      { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
      { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "W.B. Yeats" },
      { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
      { text: "The cure for boredom is curiosity. There is no cure for curiosity.", author: "Dorothy Parker" },
      { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    ]
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  // Animation for stats
  useEffect(() => {
    if (statsRef.current) {
      const children = Array.from(statsRef.current.children)
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add("opacity-100", "translate-y-0")
          child.classList.remove("opacity-0", "translate-y-4")
        }, index * 100)
      })
    }
  }, [])

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader title="My Learning Journey" description="Your personalized learning dashboard" />

        <div className="flex flex-col gap-8 p-6">
          {/* Welcome Hero Section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100 dark:from-amber-950/40 dark:via-rose-950/40 dark:to-violet-950/40 p-8 md:p-10">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6))]"></div>

            {/* Decorative elements */}
            <div className="absolute top-8 right-16 opacity-20 text-amber-500">
              <Star className="h-8 w-8 animate-pulse" />
            </div>
            <div className="absolute bottom-10 right-32 opacity-20 text-rose-500">
              <Heart className="h-6 w-6 animate-pulse" style={{ animationDuration: "3s" }} />
            </div>
            <div className="absolute top-24 right-40 opacity-10 text-violet-500">
              <GraduationCap className="h-10 w-10" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {timeOfDay === "morning" && <Sun className="h-6 w-6 text-amber-500" />}
                    {timeOfDay === "afternoon" && <Sun className="h-6 w-6 text-amber-500" />}
                    {timeOfDay === "evening" && <MoonStar className="h-6 w-6 text-indigo-500" />}
                    <h2 className="text-lg font-medium text-rose-900/80 dark:text-rose-100/80">
                      Good {timeOfDay}, Alex!
                    </h2>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 text-rose-900 dark:text-rose-100">
                    Ready to continue your journey?
                  </h1>
                  <div className="max-w-lg">
                    <p className="text-rose-800/80 dark:text-rose-200/80 mb-4 text-pretty">"{quote.text}"</p>
                    <p className="text-sm text-rose-800/60 dark:text-rose-200/60 italic">— {quote.author}</p>
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="flex flex-col items-center justify-center bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                    <div className="text-5xl font-bold text-rose-600 dark:text-rose-300 mb-1">78%</div>
                    <p className="text-sm text-rose-800 dark:text-rose-200 mb-2">Current Semester</p>
                    <div className="w-24 mb-1">
                      <Progress value={78} className="h-2 bg-rose-200 dark:bg-rose-900">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" />
                      </Progress>
                    </div>
                    <p className="text-xs text-rose-800/60 dark:text-rose-200/60">3 weeks remaining</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-700 hover:to-violet-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Zap className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  Continue Learning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100/50 dark:hover:bg-rose-900/50"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100/50 dark:hover:bg-rose-900/50"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </section>

          {/* Daily Progress & Achievements */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/60 p-2.5 rounded-xl">
                    <CupSoda className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40"
                  >
                    Today
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-amber-900 dark:text-amber-100">Daily Progress</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="flex items-center mb-5">
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-amber-800 dark:text-amber-300">Study Goal</span>
                      <span className="font-medium text-amber-900 dark:text-amber-200">3.5/5 hours</span>
                    </div>
                    <div className="h-3 w-full bg-amber-200/50 dark:bg-amber-900/50 rounded-full">
                      <div className="h-3 bg-amber-500 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-1">
                  {[
                    { text: "Morning note-taking session", completed: true },
                    { text: "Video lecture: Chemistry", completed: true },
                    { text: "Practice problems: Math", completed: true },
                    { text: "Reading assignment: Literature", completed: false },
                    { text: "Study group meeting", completed: false },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center ${
                          item.completed
                            ? "bg-amber-500 border-amber-500 dark:bg-amber-600 dark:border-amber-600"
                            : "border-amber-300 dark:border-amber-700"
                        }`}
                      >
                        {item.completed && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                      <span
                        className={`text-sm ${
                          item.completed
                            ? "text-amber-700 dark:text-amber-400 line-through opacity-70"
                            : "text-amber-800 dark:text-amber-200"
                        }`}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button
                  variant="ghost"
                  className="w-full text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-200/50 dark:hover:bg-amber-900/50"
                >
                  View Full Schedule
                </Button>
              </CardFooter>
            </Card>

            <Card className="border rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/60 p-2.5 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40"
                  >
                    This Week
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-emerald-900 dark:text-emerald-100">Weekly Highlights</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div ref={statsRef} className="space-y-4">
                  {[
                    { label: "Study Hours", value: "14.5", change: "+2.5", up: true },
                    { label: "Topics Covered", value: "8", change: "+3", up: true },
                    { label: "Quiz Score Avg", value: "92%", change: "+5%", up: true },
                    { label: "Assignments", value: "4/5", change: "", up: false },
                  ].map((stat, i) => (
                    <div key={i} className="opacity-0 translate-y-4 transition-all duration-300 ease-out">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">{stat.label}</p>
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-bold text-emerald-800 dark:text-emerald-200">{stat.value}</span>
                          {stat.change && (
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                              {stat.change}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-emerald-200/50 dark:bg-emerald-900/50 rounded-full">
                        <div
                          className="h-1.5 bg-emerald-500 rounded-full"
                          style={{ width: stat.label === "Assignments" ? "80%" : "100%" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button
                  variant="ghost"
                  className="w-full text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50"
                >
                  View Weekly Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="border rounded-xl overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/40 dark:to-violet-900/20 border-violet-200 dark:border-violet-800/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <div className="bg-violet-100 dark:bg-violet-900/60 p-2.5 rounded-xl">
                    <Trophy className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/40"
                  >
                    New
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3 text-violet-900 dark:text-violet-100">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3"
                >
                  {[
                    {
                      title: "Study Streak",
                      desc: "21 days in a row",
                      icon: Zap,
                      color: "bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400",
                    },
                    {
                      title: "Perfect Score",
                      desc: "Physics Quiz",
                      icon: Star,
                      color: "bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400",
                    },
                    {
                      title: "Fast Learner",
                      desc: "Completed Biology in record time",
                      icon: LineChart,
                      color: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      title: "Helping Hand",
                      desc: "Assisted 5 classmates",
                      icon: Heart,
                      color: "bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400",
                    },
                  ].map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * (i + 1) }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-violet-200/40 dark:hover:bg-violet-900/40 transition-colors"
                    >
                      <div className={`rounded-full p-2 ${achievement.color}`}>
                        <achievement.icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-violet-800 dark:text-violet-200">{achievement.title}</h4>
                        <p className="text-xs text-violet-600/80 dark:text-violet-300/80">{achievement.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button
                  variant="ghost"
                  className="w-full text-violet-700 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 hover:bg-violet-200/50 dark:hover:bg-violet-900/50"
                >
                  View All Achievements
                </Button>
              </CardFooter>
            </Card>
          </section>

          {/* Course Progress & Recommended */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 border border-rose-200 dark:border-rose-800/40 shadow-sm">
              <CardHeader className="pb-2 flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-rose-900 dark:text-rose-100">Continue Learning</CardTitle>
                  <p className="text-sm text-rose-700/70 dark:text-rose-300/70">Pick up where you left off</p>
                </div>
                <Button variant="ghost" size="sm" className="text-rose-700 dark:text-rose-300">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Introduction to Biology",
                      progress: 78,
                      category: "Science",
                      time: "2h 15m remaining",
                      bgClass: "from-green-100 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20",
                      borderClass: "border-green-200 dark:border-green-800/40",
                      progressBarClass: "bg-green-500",
                    },
                    {
                      title: "Advanced Mathematics",
                      progress: 45,
                      category: "Mathematics",
                      time: "3h 40m remaining",
                      bgClass: "from-blue-100 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/20",
                      borderClass: "border-blue-200 dark:border-blue-800/40",
                      progressBarClass: "bg-blue-500",
                    },
                    {
                      title: "World Literature",
                      progress: 92,
                      category: "Humanities",
                      time: "45m remaining",
                      bgClass: "from-amber-100 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20",
                      borderClass: "border-amber-200 dark:border-amber-800/40",
                      progressBarClass: "bg-amber-500",
                    },
                  ].map((course, i) => (
                    <div
                      key={i}
                      className={`rounded-xl overflow-hidden border shadow-sm bg-gradient-to-br ${course.bgClass} ${course.borderClass} hover:shadow-md transition-shadow`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-white/50 dark:bg-white/10 text-sm">
                            {course.category}
                          </Badge>
                          <div className="flex items-center text-rose-600 dark:text-rose-300">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">{course.time}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{course.title}</h3>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span className="text-rose-700/70 dark:text-rose-300/70">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-rose-100 dark:bg-rose-900/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${course.progressBarClass} rounded-full`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            size="sm"
                            className="rounded-full bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-rose-600 dark:text-rose-300"
                          >
                            Continue <ChevronRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-indigo-900 dark:text-indigo-100">For You</CardTitle>
                  <div className="bg-indigo-100/70 dark:bg-indigo-900/60 p-1.5 rounded-full">
                    <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <p className="text-sm text-indigo-700/70 dark:text-indigo-300/70">Personalized recommendations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "How to Write Better Essays",
                      type: "Article",
                      icon: BookOpen,
                      color: "bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-400",
                    },
                    {
                      title: "Science Study Group",
                      type: "Group",
                      icon: User,
                      color: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      title: "Physics Review Session",
                      type: "Event",
                      icon: Calendar,
                      color: "bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400",
                    },
                    {
                      title: "Memory Techniques",
                      type: "Video",
                      icon: MessageCircle,
                      color: "bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400",
                    },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-4 w-full p-3 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-indigo-100 dark:border-indigo-800/30 hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      <div className={`rounded-lg p-2.5 ${item.color}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-900 dark:text-indigo-50">{item.title}</h4>
                        <p className="text-xs text-indigo-600/70 dark:text-indigo-300/70">{item.type}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto text-indigo-400" />
                    </button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button
                  variant="outline"
                  className="w-full border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50"
                >
                  View More Recommendations
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Study Groups */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <Button variant="outline" size="sm" className="rounded-full">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Biology Study Group",
                  members: 8,
                  active: true,
                  lastActive: "Active now",
                  color: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/40",
                },
                {
                  name: "Math Problem Solving",
                  members: 5,
                  active: false,
                  lastActive: "1 hour ago",
                  color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40",
                },
                {
                  name: "Literature Discussion",
                  members: 12,
                  active: true,
                  lastActive: "Active now",
                  color: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40",
                },
                {
                  name: "History Research",
                  members: 4,
                  active: false,
                  lastActive: "2 days ago",
                  color: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40",
                },
              ].map((group, i) => (
                <Card key={i} className={`border shadow-sm hover:shadow-md transition-all ${group.color}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{group.name}</h3>
                      <Badge
                        variant={group.active ? "default" : "outline"}
                        className={group.active ? "bg-green-500" : ""}
                      >
                        {group.active ? "Live" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, j) => (
                          <Avatar key={j} className="border-2 border-background w-7 h-7">
                            <AvatarFallback className="text-xs bg-primary/10">{group.name.charAt(j)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members > 3 && (
                          <Avatar className="border-2 border-background w-7 h-7">
                            <AvatarFallback className="text-xs bg-primary/10">+{group.members - 3}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{group.members} members</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${group.active ? "bg-green-500" : "bg-muted"}`}></div>
                      {group.lastActive}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-4">
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </SidebarInset>

      {settingsOpen && <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />}
    </SidebarProvider>
  )
}
