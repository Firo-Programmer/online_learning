"use client"

import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AnimatedLoadingSkeleton from "@/components/ui/animated-loading-skeleton"

export default function AskAILoading() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center h-screen">
          <AnimatedLoadingSkeleton />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
