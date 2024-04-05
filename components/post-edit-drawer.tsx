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

type Props = {
  text: string
  onEditText: (text: string) => void
  children: React.ReactNode
}

const PostEditDrawer = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ text, children, onEditText }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const successRef = React.useRef(false);
  const urlRef = React.useRef("");

  const handlePublish = async (comment?: string) => {
    setIsLoading(true)

    const result = await publishPost({ text, comment })

    if (result && 'error' in result) {
      alert(result.error) // use toast
      return setIsLoading(false)
    }

    const cannon = confetti.create(canvas.current as HTMLCanvasElement, {
      resize: true
    });

    cannon({
      particleCount: 500,
      spread: 360,
      zIndex: 999
    });

    if (result.postUrn) {
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
          <Button variant="secondary">
            Guardar borrador
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
