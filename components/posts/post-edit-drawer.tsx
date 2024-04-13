"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import Editor from "../editor/advanced-editor"
import { Button } from "@/components/ui/button"
import { PostConfirmModal } from "./post-confirm-modal"
import { IconSend } from "@tabler/icons-react"
import { usePost } from "./post-context"
import { cn } from "@/lib/utils"

type Props = {
  disableSave: boolean
  children: React.ReactNode
}

const PostEditDrawer = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ disableSave, children }, ref) => {
  const {
    text,
    urlRef,
    isSuccess,
    isLoading,
    onPublish,
    onSave,
    onEditText
  } = usePost()

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
            onClick={onSave}
            disabled={disableSave}
            className={cn({
              'bg-green-600 cursor-not-allowed': disableSave
            })}
          >
            Guardar post
          </Button>
          <PostConfirmModal
            isSuccess={isSuccess}
            urlRef={urlRef}
            onPublish={onPublish}
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
