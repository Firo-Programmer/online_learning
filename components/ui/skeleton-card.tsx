import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  aspectRatio?: "portrait" | "square" | "video" | "wide"
  hasImage?: boolean
  hasFooter?: boolean
  hasAction?: boolean
}

export function SkeletonCard({
  className,
  aspectRatio = "portrait",
  hasImage = false,
  hasFooter = false,
  hasAction = false,
}: SkeletonCardProps) {
  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow animate-pulse overflow-hidden", className)}
    >
      {hasImage && (
        <div
          className={cn("flex items-center justify-center bg-muted", {
            "aspect-[3/4]": aspectRatio === "portrait",
            "aspect-square": aspectRatio === "square",
            "aspect-video": aspectRatio === "video",
            "aspect-[16/9]": aspectRatio === "wide",
          })}
        />
      )}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded-md w-3/4" />
        <div className="h-3 bg-muted rounded-md w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded-md w-full" />
          <div className="h-3 bg-muted rounded-md w-5/6" />
          <div className="h-3 bg-muted rounded-md w-4/6" />
        </div>
      </div>
      {hasFooter && (
        <div className="p-4 border-t flex items-center justify-between">
          <div className="h-3 bg-muted rounded-md w-1/4" />
          {hasAction && <div className="h-8 bg-muted rounded-md w-1/4" />}
        </div>
      )}
    </div>
  )
}
