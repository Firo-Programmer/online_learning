"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  onChange: (color: string) => void
  value?: string
  presetColors?: string[]
}

export function ColorPicker({ onChange, value = "#000000", presetColors = [] }: ColorPickerProps) {
  const [color, setColor] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Default preset colors if none provided
  const defaultPresetColors =
    presetColors.length > 0
      ? presetColors
      : ["#000000", "#ffffff", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#d946ef"]

  useEffect(() => {
    setColor(value)
  }, [value])

  const handleChange = (newColor: string) => {
    setColor(newColor)
    onChange(newColor)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-gray-300 dark:border-gray-700"
          style={{ backgroundColor: color }}
        >
          <span className="sr-only">Pick a color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex flex-col gap-3">
          <div className="flex gap-1">
            <div
              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-700"
              style={{ backgroundColor: color }}
            />
            <input
              ref={inputRef}
              type="text"
              value={color}
              onChange={(e) => handleChange(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-transparent"
            />
          </div>

          <div>
            <input
              type="color"
              value={color}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full h-8 cursor-pointer border-0 p-0 bg-transparent"
              style={{ colorScheme: "normal" }}
            />
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {defaultPresetColors.map((presetColor) => (
              <button
                key={presetColor}
                className={cn(
                  "w-6 h-6 rounded-md border border-gray-300 dark:border-gray-700",
                  color === presetColor && "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600",
                )}
                style={{ backgroundColor: presetColor }}
                onClick={() => handleChange(presetColor)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
