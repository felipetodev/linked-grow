import { Skeleton } from "@/components/ui/skeleton";
import { IconLink } from "@tabler/icons-react";

export function YoutubeSkeleton() {
  return (
    <div className="relative flex flex-col gap-y-2.5 h-[250px] md:h-[360px] rounded-2xl">
      <Skeleton className="h-full w-full" />
      <div className="flex w-full">
        <Skeleton className="size-[50px] px-[25px] rounded-full" />
        <div className="w-full space-y-2.5 ml-2">
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="h-5 w-[70%]" />
        </div>
      </div>
      <div className="absolute flex flex-col md:flex-row gap-y-2 justify-center items-center size-full opacity-50 px-4">
        <span className="text-xs md:text-sm">Añade un enlace de YouTube</span>
        <IconLink size={24} className="ml-1" />
      </div>
    </div>
  )
}
