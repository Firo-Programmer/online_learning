"use client"

import type React from "react"

import Link from "next/link"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface NavMainProps {
  items?: {
    title: string
    url: string
    icon: React.ElementType
    action?: string
  }[]
  onAction?: (action: string | undefined) => void
  currentPath?: string
}

export function NavMain({ items = [], onAction, currentPath }: NavMainProps) {
  const handleClick = (e: React.MouseEvent, item: { url: string; action?: string }) => {
    if (item.action) {
      e.preventDefault()
      onAction?.(item.action)
    }
  }

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={currentPath === item.url} tooltip={item.title}>
            <Link href={item.url} onClick={(e) => handleClick(e, item)}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
