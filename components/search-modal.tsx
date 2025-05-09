"use client"

import { Search } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search or ask a question..."
              className="border-none shadow-none focus-visible:ring-0 pl-0"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Search by:</p>
            <div className="flex gap-1 flex-wrap">
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/50">
                Notes
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/50">
                Materials
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/50">
                Courses
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/50">
                Calendar
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 border-b border-t">
          <p className="text-sm font-medium">Recent searches</p>
        </div>
        <div className="p-2 space-y-1">
          {["Biology notes", "Math formulas", "Literature essay"].map((item, i) => (
            <Button key={i} variant="ghost" className="w-full justify-start text-sm h-9 px-2">
              <Search className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              {item}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
