import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col justify-between gap-y-2 h-[130px] border rounded p-2 transition-transform hover:-translate-y-0.5">
          <Skeleton className="w-full h-full" />
          <div className="flex gap-x-2 w-full h-[50px]">
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
