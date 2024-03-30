'use client'

import { StreamableValue } from "ai/rsc"
import { useStreamableText } from "@/lib/hooks/use-streamable-text"
import { IconBookmark, IconEdit, IconWorld } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { MemoizedReactMarkdown } from "./ui/markdown"
import { PostEditDrawer } from "@/app/(dashboard)/templates/components/post-edit-drawer"
import { useUser, useClerk } from "@clerk/clerk-react"
import { usePathname } from "next/navigation"

export function PostContent({
  content,
  className
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  const text = useStreamableText(content)
  const pathname = usePathname();
  return (
    <div className={cn('border rounded group relative flex flex-col gap-y-8 items-start p-2', className)}>
      {text?.length > 0 && (
        <span className="absolute top-0 right-0 font-semibold text-xs opacity-60 p-2">
          {text.length} caracteres
        </span>
      )}
      <div className="flex items-center">
        <div className="flex justify-center items-center size-[48px] p-4 border rounded-full bg-background ">
          FO
        </div>
        <div className="ml-2 flex-1 overflow-hidden px-1">
          <div className="font-semibold">
            Felipe Ossandón
          </div>
          <div className="flex items-center text-xs opacity-60">
            Hace 2 horas{' '}
            <span className="block mx-1" aria-label="hidden">•</span>{' '}
            <IconWorld size={16} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          components={{
            p({ children }) {
              return <p className="mb-1 last:mb-0">{children}</p>
            }
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
      <footer className="flex gap-x-4 w-full">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {isSignedIn ? (
              <Button size='sm' className="size-9 p-0 w-full">
                <IconBookmark size={20} />
              </Button>

            ) : (
              <Button
                size='sm'
                className="size-9 p-0 w-full"
                onClick={() => clerk.openSignIn({ redirectUrl: pathname })}
              >
                <IconBookmark size={20} />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent className="text-xs flex items-center gap-4">
            Guardar post
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <PostEditDrawer>
            <TooltipTrigger asChild>
              <Button size='sm' className="size-9 p-0 w-full">
                <IconEdit size={20} />
              </Button>
            </TooltipTrigger>
          </PostEditDrawer>
          <TooltipContent className="text-xs flex items-center gap-4">
            Editar post
          </TooltipContent>
        </Tooltip>
      </footer>
    </div>
  )
}
