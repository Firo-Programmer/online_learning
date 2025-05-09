import AnimatedLoadingSkeleton from "@/components/ui/animated-loading-skeleton"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function StudyPlanLoading() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <div className="min-h-screen bg-white">
          <div className="bg-gradient-to-r from-blue-500 to-purple-400 h-16 rounded-t-xl"></div>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <AnimatedLoadingSkeleton />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
