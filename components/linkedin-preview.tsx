import { useState } from "react"
import {
  IconMessage,
  IconPhoto,
  IconRepeat,
  IconSend,
  IconThumbUp,
  IconWorld
} from "@tabler/icons-react";
import {
  LinkedInCelebrateIcon,
  LinkedInLikeIcon,
  LinkedInLoveIcon
} from "./ui/icons";
import { MemoizedReactMarkdown } from "./ui/markdown";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export function LinkedInPreview({ author, content }: { author?: string, content: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const maxChars = 320
  const truncatedContent = isOpen ? content : content.slice(0, maxChars) + '...'

  return (
    <div className="rounded-xl bg-white text-black py-5 px-6 max-w-xl h-fit">
      <header className="mb-3">
        <div className="flex items-center">
          <div className="grid place-items-center h-12 w-12 rounded-full bg-[#f2f4f7]">
            <IconPhoto className="text-gray-400" size={20} />
          </div>
          <div className="ml-2 flex-1 overflow-hidden px-1">
            <div className="font-semibold text-sm">
              {author ?? "User"}
            </div>
            <div className="flex items-center text-xs opacity-60">
              <span>Now</span>
              <span className="block mx-1" aria-label="hidden">•</span>
              <IconWorld size={14} />
            </div>
          </div>
        </div>
      </header>
      <div
        className={cn("relative", {
          "pb-2": !isOpen,
          "pb-8": isOpen,
        })}
      >
        <MemoizedReactMarkdown
          className="text-sm prose break-words prose-pre:p-0"
          components={{
            p({ children }) {
              return <p className="mb-1 last:mb-0">{children}</p>
            }
          }}
        >
          {truncatedContent}
        </MemoizedReactMarkdown>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-0 bottom-0 text-sm opacity-60 font-medium hover:opacity-100 hover:text-[#0b66c2] hover:underline"
        >
          {isOpen ? "...ver menos" : "...ver más"}
        </button>
      </div>
      <footer className="mt-3">
        <div className="flex items-center">
          <LinkedInLikeIcon />
          <LinkedInLoveIcon className="-translate-x-1" />
          <LinkedInCelebrateIcon className="-translate-x-2" />
          <span className="text-xs opacity-60 font-medium">
            60
          </span>
          <div className="flex ml-auto text-xs opacity-60 font-medium">
            <span>3 comentarios</span>
            <span className="block mx-1" aria-label="hidden">•</span>
            <span>1 resposteo</span>
          </div>
        </div>
        <Separator className="bg-neutral-500/50 my-2" />
        <div className="flex justify-between items-center">
          <button className="cursor-default flex items-center text-neutral-500 font-medium px-2 py-3 rounded transition-colors hover:bg-neutral-500/10 hover:text-neutral-600">
            <IconThumbUp className="mr-1 md:h-4 md:w-4 lg:w-6 lg:h-6" />
            <span className="hidden md:block">Me gusta</span>
          </button>
          <button className="cursor-default flex items-center text-neutral-500 font-medium px-2 py-3 rounded transition-colors hover:bg-neutral-500/10 hover:text-neutral-600">
            <IconMessage className="mr-1 md:h-4 md:w-4 lg:w-6 lg:h-6" />
            <span className="hidden md:block">Comentar</span>
          </button>
          <button className="cursor-default flex items-center text-neutral-500 font-medium px-2 py-3 rounded transition-colors hover:bg-neutral-500/10 hover:text-neutral-600">
            <IconRepeat className="mr-1 md:h-4 md:w-4 lg:w-6 lg:h-6" />
            <span className="hidden md:block">Repostear</span>
          </button>
          <button className="cursor-default flex items-center text-neutral-500 font-medium px-2 py-3 rounded transition-colors hover:bg-neutral-500/10 hover:text-neutral-600">
            <IconSend className="mr-1 md:h-4 md:w-4 lg:w-6 lg:h-6" />
            <span className="hidden md:block">Compartir</span>
          </button>
        </div>
      </footer>
    </div>
  )
}