"use client"

import type * as React from "react"
import {
  AudioWaveform,
  Command,
  Home,
  BookOpen,
  PenTool,
  FolderOpen,
  Sparkles,
  ClipboardList,
  BookCheck,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavMain } from "./nav-main"
import { NavWorkspaces } from "./nav-workspaces"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarRail } from "@/components/ui/sidebar"
import { SettingsDialog } from "./settings-dialog"
import { useState } from "react"
import { SearchModal } from "./search-modal"
import { SidebarFooterNav } from "./sidebar-footer-nav"

// This is sample data.
const data = {
  teams: [
    {
      name: "Learning Hub",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Study Group",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Research Lab",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Ask AI",
      url: "/dashboard/ask-ai",
      icon: Sparkles,
    },
    {
      title: "Notes",
      url: "/dashboard/notes",
      icon: PenTool,
    },
    {
      title: "Materials",
      url: "/dashboard/materials",
      icon: FolderOpen,
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Study Plan",
      url: "/dashboard/study-plan",
      icon: ClipboardList,
    },
    {
      title: "Quizzes",
      url: "/dashboard/quizzes",
      icon: BookCheck,
    },
  ],
}

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleAction = (action: string | undefined) => {
    if (action === "search") {
      setSearchOpen(true)
    } else if (action === "settings") {
      setSettingsOpen(true)
    }
  }

  return (
    <>
      <Sidebar collapsible="icon" className="border-r" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
          <NavMain items={data.navMain} onAction={handleAction} currentPath={pathname} />
        </SidebarHeader>
        <SidebarContent>
          <NavWorkspaces workspaces={data.workspaces} currentPath={pathname} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterNav />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
