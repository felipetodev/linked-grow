"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Editor } from "@/components/editor/advanced-editor"
import { Button } from "@/components/ui/button"
import { PostConfirmModal } from "./post-confirm-modal"
import { IconEye, IconPencil, IconSend } from "@tabler/icons-react"
import { usePost } from "./post-context"
import { LinkedInPreview } from "@/components/write/linkedin-preview"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { useUser } from "@clerk/nextjs";
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

  const { user } = useUser()
  const isMobile = useMediaQuery("(max-width: 1280px)");

  return (
    <Sheet>
      <SheetTrigger asChild ref={ref}>
        {children}
      </SheetTrigger>
      <SheetContent className="grid xl:grid-cols-2 gap-x-2 border-t !max-w-full !w-full !h-[calc(100vh_-_theme(spacing.16))] mt-auto overflow-y-auto">
        {isMobile ? (
          <Tabs defaultValue="editor">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">
                <IconPencil size={20} className="mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview">
                <IconEye size={20} className="mr-2" />
                Vista previa
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <Editor
                text={text}
                onEditText={onEditText}
              />
              <div className="mt-4 ml-auto space-x-2 xl:space-x-4">
                {isSuccess ? (
                  <Button
                    onClick={onSave}
                    disabled={isSuccess}
                    className='bg-green-600 text-white cursor-not-allowed'
                  >
                    Post publicado ✨
                  </Button>
                ) : (
                  <Button
                    onClick={onSave}
                    disabled={disableSave}
                    className={cn({
                      'bg-green-600 text-white cursor-not-allowed': disableSave || isLoading
                    })}
                  >
                    {isLoading ? "Guardando..." : "Guardar Post"}
                  </Button>
                )}
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
              </div>
            </TabsContent>

            <TabsContent value="preview" className="!h-full">
              <div className="flex justify-center bg-accent p-4 rounded h-full">
                <LinkedInPreview
                  content={text}
                  author={user?.fullName ?? user?.firstName ?? "Usuario"}
                  isPublished={isSuccess}
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <div className="flex flex-col">
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
                {isSuccess ? (
                  <Button
                    onClick={onSave}
                    disabled={isSuccess}
                    className='bg-green-600 text-white cursor-not-allowed'
                  >
                    Post publicado ✨
                  </Button>
                ) : (
                  <Button
                    onClick={onSave}
                    disabled={disableSave}
                    className={cn({
                      'bg-green-600 text-white cursor-not-allowed': disableSave || isLoading
                    })}
                  >
                    {isLoading ? "Guardando..." : "Guardar Post"}
                  </Button>
                )}
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
            </div>
            <div className="flex justify-center bg-accent p-4 rounded h-full overflow-y-auto">
              <LinkedInPreview
                content={text}
                author={user?.fullName ?? user?.firstName ?? "Usuario"}
                isPublished={isSuccess}
              />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
})

PostEditDrawer.displayName = "PostEditDrawer"

export { PostEditDrawer }
