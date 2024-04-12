'use client'

import { useState, useRef } from "react"
import { StreamableValue } from "ai/rsc"
import { useStreamableText } from "@/lib/hooks/use-streamable-text"
import { IconBookmark, IconEdit, IconWorld } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { MemoizedReactMarkdown } from "./ui/markdown"
import { PostEditDrawer } from "@/components/post-edit-drawer"
import { useUser, useClerk } from "@clerk/clerk-react"
import { usePathname } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner";
import { type Id } from "@/convex/_generated/dataModel"

export function PostContent({
  content,
  className
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [postId, setPostId] = useState<Id<"posts"> | undefined>(undefined)
  const [editText, setEditText] = useState<undefined | string>()
  const submittedContent = useRef<string | undefined>(undefined)

  const { isSignedIn } = useUser();
  const clerk = useClerk();
  const text = useStreamableText(content)
  const pathname = usePathname();

  const createPost = useMutation(api.posts.createPost)
  const updatePost = useMutation(api.posts.updatePost)

  const handleSavePost = async () => {
    setIsLoading(true)
    submittedContent.current = editText

    if (submittedContent.current === editText && postId) {
      await updatePost({ content: editText ?? text, postId, status: 'draft' })
      toast.success('Post guardado')
      setIsLoading(false)
      return
    }

    try {
      const postId = await createPost({ content: editText ?? text, status: 'draft' })
      toast.success('Post guardado')
      setPostId(postId)
      setIsLoading(false)
    } catch {
      toast.error('Error al guardar el post')
    } finally {
      setIsLoading(false)
    }
  }

  const hasChanges = submittedContent.current !== editText

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
          {editText ?? text}
        </MemoizedReactMarkdown>
      </div>
      <footer className="flex gap-x-4 w-full">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {isSignedIn ? (
              <Button
                size='sm'
                disabled={(!hasChanges && Boolean(postId))}
                className={cn("size-9 p-0 w-full", {
                  'bg-green-600 cursor-not-allowed': (!hasChanges && postId)
                })}
                onClick={handleSavePost}
              >
                {isLoading && <span className="mr-1.5">Guardando...</span>}
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

        {isSignedIn ? (
          <Tooltip delayDuration={0}>
            <PostEditDrawer
              postId={postId}
              text={editText ?? text}
              disableSave={(!hasChanges && Boolean(postId))}
              onEditText={setEditText}
              onSavePost={handleSavePost}
            >
              <TooltipTrigger asChild>
                <Button size='sm' className="size-9 p-0 w-full">
                  <IconEdit size={20} />
                </Button>
              </TooltipTrigger>
            </PostEditDrawer>
            <TooltipContent
              className="text-xs flex items-center gap-4"
            >
              Editar post
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                className="size-9 p-0 w-full"
                onClick={() => clerk.openSignIn({ redirectUrl: pathname })}
              >
                <IconEdit size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="text-xs flex items-center gap-4"
            >
              Editar post
            </TooltipContent>
          </Tooltip>
        )}
      </footer>
    </div>
  )
}
