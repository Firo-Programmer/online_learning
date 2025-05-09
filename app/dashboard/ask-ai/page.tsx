"use client"

import { SidebarLeft } from "../../../components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { VercelV0Chat } from "@/components/ui/v0-ai-chat"

export default function AskAIPage() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex items-center justify-center p-6 bg-gradient-to-b from-white to-purple-50/30 dark:from-gray-950 dark:to-purple-950/10 min-h-[calc(100vh-4rem)]">
          <VercelV0Chat />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
