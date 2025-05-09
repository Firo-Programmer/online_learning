"use client"

import Link from "next/link"
import { ChevronDown, Plus } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavWorkspacesProps {
  workspaces?: {
    name: string
    emoji: string
    pages: {
      name: string
      url: string
      emoji: string
    }[]
  }[]
  currentPath?: string
}

export function NavWorkspaces({ workspaces = [], currentPath }: NavWorkspacesProps) {
  return (
    <>
      {workspaces.map((workspace) => (
        <Collapsible key={workspace.name} defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{workspace.emoji}</span>
                  <span>{workspace.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus />
              <span className="sr-only">Add Page</span>
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSub>
                      {workspace.pages.map((page) => (
                        <SidebarMenuSubItem key={page.name}>
                          <SidebarMenuSubButton asChild isActive={currentPath === page.url}>
                            <Link href={page.url}>
                              <span className="mr-2">{page.emoji}</span>
                              {page.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  )
}
