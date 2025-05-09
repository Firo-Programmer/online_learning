"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, ChevronDown, Command } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchModal } from "./search-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b dark:border-purple-900/50 backdrop-blur-sm">
        <div className="flex flex-1 items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setSearchOpen(true)}
              className="h-9 px-3 rounded-full border shadow-sm bg-white dark:bg-purple-950/50 dark:border-purple-800 text-muted-foreground"
            >
              <Search className="h-4 w-8 mr-2" />
              <span className="mr-1">Search...</span>
              <div className="flex items-center border rounded px-1 py-0.5 bg-muted/50 text-xs">
                <Command className="h-3 w-3 mr-1" />
                <span>K</span>
              </div>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border shadow-sm bg-white dark:bg-purple-950/50 dark:border-purple-800 relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border shadow-sm bg-white dark:bg-purple-950/50 dark:border-purple-800 flex items-center gap-2 pr-3"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Alex</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">Alex Lee</span>
                    <span className="text-xs text-muted-foreground">alex.lee@example.com</span>
                  </div>
                </div>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2" />

                <div className="px-2 py-1.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">Current Plan</span>
                    <Badge
                      variant="outline"
                      className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                    >
                      Pro
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mb-1">
                    <div className="bg-purple-600 h-1.5 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">75% of storage used</p>
                </div>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
