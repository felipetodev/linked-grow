"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import Editor from "./editor/advanced-editor"
import { Button } from "./ui/button"
import { publishPost } from "@/app/actions/post"
import { PostConfirmModal } from "./post-confirm-modal"
import { IconSend } from "@tabler/icons-react"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { type Id } from "@/convex/_generated/dataModel"

type Props = {
  text: string
  disableSave: boolean
  postId: Id<"posts"> | undefined
  onEditText: (text: string) => void
  onSavePost: () => void
  children: React.ReactNode
}

const PostEditDrawer = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ text, disableSave, postId, children, onSavePost, onEditText }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const successRef = React.useRef(false);
  const urlRef = React.useRef("");

  const createPost = useMutation(api.posts.createPost)
  const updatePost = useMutation(api.posts.updatePost)

  const handlePublish = async (comment?: string) => {
    setIsLoading(true)

    const result = await publishPost({ text, comment })

    if (result && 'error' in result) {
      toast.error(result.error) // use toast
      setIsLoading(false)
      return
    }

    if (result.postUrn) {
      if (postId) {
        await updatePost({ postId, content: text, status: "published", postUrn: result.postUrn })
      } else {
        await createPost({ content: text, status: "published", postUrn: result.postUrn })
      }

      const cannon = confetti.create(canvas.current as HTMLCanvasElement, {
        resize: true
      });

      cannon({
        particleCount: 500,
        spread: 360,
        zIndex: 999
      });

      urlRef.current = result.postUrn
      successRef.current = true
    }

    setIsLoading(false)
  }

  return (
    <Sheet>
      <SheetTrigger asChild ref={ref}>
        {children}
      </SheetTrigger>
      <SheetContent className="border-t !max-w-full !w-full !h-[calc(100vh_-_theme(spacing.16))] mt-auto overflow-y-auto">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Escribe tu post
          </h3>
          <div className="grid gap-4 py-4 overflow-hidden">
            <Editor
              text={text}
              onEditText={onEditText}
            />
          </div>
        </div>
        <SheetFooter className="flex justify-between">
          <Button
            onClick={onSavePost}
            disabled={disableSave}
            className={cn({
              'bg-green-600 cursor-not-allowed': disableSave
            })}
          >
            Guardar post
          </Button>
          <PostConfirmModal
            isSuccess={successRef.current}
            urlRef={urlRef.current}
            onPublish={handlePublish}
            isLoading={isLoading}
          >
            <Button className="group">
              Publicar
              <IconSend
                size={20}
                className="ml-2 transition-transform group-hover:rotate-12 group-hover:scale-125"
              />
            </Button>
          </PostConfirmModal>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
})

PostEditDrawer.displayName = "PostEditDrawer"

export { PostEditDrawer }
