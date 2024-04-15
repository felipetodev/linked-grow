import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton({ repeat = 6 }: { repeat?: number }) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,1fr))]">
      {Array.from({ length: repeat }).map((_, i) => (
        <div key={i} className="flex flex-col gap-y-2 h-[400px] p-4 rounded border">
          <div className="flex items-center space-x-2">
            <Skeleton className="size-[48px] rounded-full" />
            <div className="space-y-2 flex flex-col w-[calc(100%-56px)]">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
          <Skeleton className="w-full h-full" />
          <div className="flex gap-x-4 w-full h-[50px]">
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
