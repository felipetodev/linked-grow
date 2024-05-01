import { useState } from "react"
import {
  IconMessage,
  IconRepeat,
  IconSend,
  IconThumbUp,
  IconWorld
} from "@tabler/icons-react";
import {
  LinkedInCelebrateIcon,
  LinkedInLikeIcon,
  LinkedInLoveIcon
} from "@/components/ui/icons";
import { PostUserAvatar } from "@/app/(dashboard)/posts/components/post-user-avatar";
import { MemoizedReactMarkdown } from "@/components/ui/markdown";
import { FilePreviewThumbnail } from "./file-preview-thumbnail";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type Id } from "@/convex/_generated/dataModel";

type Props = {
  content: string
  author?: string,
  fileId?: Id<"_storage">,
  fileType?: string,
  isPublished: boolean
}

const randomLikes = Math.floor(Math.random() * 100)

export function LinkedInPreview({
  author,
  fileId,
  content,
  fileType,
  isPublished = false
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const maxChars = 320
  const truncatedContent = isOpen ? content : content.length > maxChars ? `${content.slice(0, maxChars)}...` : content

  return (
    <div className="rounded-xl bg-white text-black py-5 w-full max-w-xl h-fit">
      <header className="mb-3 px-4">
        <div className="flex items-center">
          <PostUserAvatar />
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
        className={cn("relative px-4 h-full", {
          "pb-2": !isOpen,
          "pb-8": isOpen,
        })}
      >
        <MemoizedReactMarkdown
          className="text-sm prose break-words prose-pre:p-0"
          components={{
            p({ children }) {
              if (children?.toString().includes("#")) {
                // bold hashtag word like linkedin. eg: <span>#hashtag</span>
                for (const word of children.toString().split(" ")) {
                  if (word.startsWith("#")) {
                    const index = children.toString().indexOf(word)
                    const before = children.toString().slice(0, index)
                    const after = children.toString().slice(index)
                    return (
                      <p className="mb-1 last:mb-0">
                        {before}{" "}
                        <span className="text-linkedin font-semibold">{after}</span>
                      </p>
                    )
                  }
                }
              }
              return <p className="mb-1 last:mb-0">{children}</p>
            }
          }}
        >
          {truncatedContent}
        </MemoizedReactMarkdown>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute px-4 right-0 bottom-0 text-sm opacity-60 font-medium hover:opacity-100 hover:text-[#0b66c2] hover:underline"
        >
          {isOpen ? "...ver menos" : "...ver más"}
        </button>
      </div>
      <FilePreviewThumbnail
        fileId={fileId}
        isImage={Boolean(fileType?.includes("image"))}
        isVideo={Boolean(fileType?.includes("video"))}
        isPublished={isPublished}
      />
      <footer className="mt-3 px-4">
        <div className="flex items-center">
          <LinkedInLikeIcon />
          <LinkedInLoveIcon className="-translate-x-1" />
          <LinkedInCelebrateIcon className="-translate-x-2" />
          <span suppressHydrationWarning className="text-xs opacity-60 font-medium">
            {randomLikes}
          </span>
          <div className="flex ml-auto text-xs opacity-60 font-medium">
            <span>6 comentarios</span>
            <span className="block mx-1" aria-label="hidden">•</span>
            <span>2 resposteo</span>
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
