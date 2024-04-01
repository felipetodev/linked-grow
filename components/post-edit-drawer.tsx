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
import { IconSend } from "@tabler/icons-react"

type Props = {
  text: string
  onEditText: (text: string) => void
  children: React.ReactNode
}

const PostEditDrawer = React.forwardRef<HTMLButtonElement, Props>(({ text, children, onEditText }, ref) => {
  return (
    <Sheet>
      <SheetTrigger asChild ref={ref}>
        {children}
      </SheetTrigger>
      <SheetContent className="!max-w-full !w-full !h-[calc(100vh_-_theme(spacing.16))] mt-auto overflow-y-auto">
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
          <Button className="group">
            Publicar
            <IconSend
              size={20}
              className="ml-2 transition-transform group-hover:rotate-12 group-hover:scale-125"
            />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
})

PostEditDrawer.displayName = "PostEditDrawer"

export { PostEditDrawer }
