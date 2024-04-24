import { Skeleton } from "@/components/ui/skeleton";

export function YoutubeSkeleton() {
  return (
    <div className="flex flex-col gap-y-2.5 h-[340px] rounded-2xl">
      <Skeleton className="h-full w-full" />
      <div className="flex w-full">
        <Skeleton className="size-[50px] px-[25px] rounded-full" />
        <div className="w-full space-y-2.5 ml-2">
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="h-5 w-[70%]" />
        </div>
      </div>
    </div>
  )
}
