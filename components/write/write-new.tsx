"use client"

import * as React from "react"
import { IconEye, IconPencil, IconSend } from "@tabler/icons-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LinkedInPreview } from "./linkedin-preview";
import { useFileUpload } from "../upload-files-context";
import { publishPost } from "@/app/actions/post";
import confetti from "canvas-confetti";
import { toast } from 'sonner'
import { Editor } from "../editor/advanced-editor";
import { Button } from "../ui/button";
import { PostConfirmModal } from "../posts/post-confirm-modal";
import { cn } from "@/lib/utils";
import { type Id } from "@/convex/_generated/dataModel";

export function WriteNew() {
  const [content, setContent] = React.useState<string>("")
  const [postId, setPostId] = React.useState<Id<"posts"> | undefined>()
  const [isLoading, setIsLoading] = React.useState(false)
  const isMobile = useMediaQuery("(max-width: 1280px)");

  const canvas = React.useRef<HTMLCanvasElement>(null);
  const submittedContent = React.useRef<string | undefined>();
  const fileIdRef = React.useRef<Id<"_storage"> | undefined>()
  const successRef = React.useRef(false);
  const urlRef = React.useRef("");

  const { file, onDeletePostFile } = useFileUpload();

  const createPost = useMutation(api.posts.createPost)
  const updatePost = useMutation(api.posts.updatePost)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const getConvexStorageId = async (file: File) => {
    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await result.json();
    return storageId
  }

  const handleSavePost = async () => {
    setIsLoading(true)
    submittedContent.current = content

    if (file && !fileIdRef.current) {
      // upload new file
      const fileId = await getConvexStorageId(file)
      fileIdRef.current = fileId
    }

    if (file && fileIdRef.current && postId) {
      // delete prev file
      onDeletePostFile({ fileId: fileIdRef.current, postId, deletePreview: false })
      // upload new file
      const fileId = await getConvexStorageId(file)
      fileIdRef.current = fileId
    }

    if (!file && fileIdRef.current && postId) {
      // delete file and update post with no file
      onDeletePostFile({ fileId: fileIdRef.current, postId, deletePreview: true })
      fileIdRef.current = undefined
    }

    if (submittedContent.current === content && postId) {
      await updatePost({
        content,
        postId,
        status: 'draft',
        fileId: fileIdRef.current,
        fileType: file?.type
      })
      toast.success('Post guardado')
      setIsLoading(false)
      return
    }

    try {
      const postId = await createPost({
        content,
        status: 'draft',
        fileId: fileIdRef.current,
        fileType: file?.type
      })
      toast.success('Post guardado')
      setPostId(postId)
    } catch {
      toast.error('Error al guardar el post')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublishPost = async (comment?: string) => {
    setIsLoading(true)

    let formData: null | FormData = null

    if (file && !fileIdRef.current) {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId: fileId } = await result.json();
      fileIdRef.current = fileId

      formData = new FormData()
      formData.append("file", file)
    }

    if (file && fileIdRef.current) {
      formData = new FormData()
      formData.append("file", file)
    }

    const result = await publishPost({ text: content, comment, file: formData })

    if (result && 'error' in result) {
      toast.error(result.error)
      setIsLoading(false)
      return
    }

    if (result.postUrn) {
      if (postId) {
        await updatePost({
          postId,
          content: content,
          status: "published",
          postUrn: result.postUrn,
          fileId: fileIdRef.current,
          fileType: file?.type
        })
      } else {
        await createPost({
          content: content,
          status: "published",
          postUrn: result.postUrn,
          fileId: fileIdRef.current,
          fileType: file?.type
        })
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

  const hasChanges = submittedContent.current !== content;

  return (
    <>
      {isMobile ? (
        <Tabs defaultValue="editor" className="">
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
              text={content}
              onEditText={setContent}
            />
            <div className="mt-4 ml-auto space-x-2 xl:space-x-4">
              {successRef.current ? (
                <Button className="bg-green-600 text-white" disabled>
                  <span className="mr-1">Publicado</span>
                </Button>
              ) : (
                <Button
                  onClick={handleSavePost}
                  disabled={(!hasChanges && Boolean(postId))}
                  className={cn({
                    'bg-green-600 text-white': isLoading,
                    'bg-green-600 text-white cursor-not-allowed': (!hasChanges && postId)
                  })}
                >
                  {isLoading ? "Guardando..." : "Guardar borrador"}
                </Button>
              )}
              <PostConfirmModal
                isSuccess={successRef.current}
                urlRef={urlRef.current}
                onPublish={handlePublishPost}
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
          <TabsContent value="preview">
            <div className="flex justify-center bg-accent p-4 rounded h-full">
              <LinkedInPreview
                content={content}
                isPublished={successRef.current}
              />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid xl:grid-cols-2 gap-x-2 h-full overflow-y-auto">
          <div className="flex flex-col">
            <Editor
              text={content}
              onEditText={setContent}
            />
            <div className="mt-4 ml-auto space-x-2 xl:space-x-4">
              {successRef.current ? (
                <Button className="bg-green-600 text-white" disabled>
                  <span className="mr-1">Publicado</span>
                  {/* {updatedAt && <TimeAgo timestamp={updatedAt} />} */}
                </Button>
              ) : (
                <Button
                  onClick={handleSavePost}
                  disabled={(!hasChanges && Boolean(postId))}
                  className={cn({
                    'bg-green-600 text-white': isLoading,
                    'bg-green-600 text-white cursor-not-allowed': (!hasChanges && postId)
                  })}
                >
                  {isLoading ? "Guardando..." : "Guardar borrador"}
                </Button>
              )}
              <PostConfirmModal
                isSuccess={successRef.current}
                urlRef={urlRef.current}
                onPublish={handlePublishPost}
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
          </div>
          <div className="flex justify-center bg-accent p-4 rounded h-full">
            <LinkedInPreview
              content={content}
              isPublished={successRef.current}
            />
          </div>
        </div>
      )}
    </>
  )
}
