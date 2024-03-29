import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconBookmark, IconSparkles } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function CardsIdeas({ ideas }: { ideas: { message: string, id: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {ideas.map(({ message, id }) => (
        <div key={id} className="flex flex-col justify-between border rounded p-2 transition hover:-translate-y-0.5 hover:bg-secondary">
          <p className="text-sm mb-4">{message}</p>
          <footer className="flex gap-x-2 w-full">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={{
                    pathname: `/templates/${id}`,
                    query: { message }
                  }}
                  className={cn(buttonVariants({ size: "sm" }), "size-9 p-0 w-full")}
                >
                  <IconSparkles size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="text-xs flex items-center gap-4">
                Generar post con esta idea
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button size='sm' className="size-9 p-0 w-full">
                  <IconBookmark size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs flex items-center gap-4">
                Guardar
              </TooltipContent>
            </Tooltip>
          </footer>
        </div>
      ))}
    </div>
  )
}
