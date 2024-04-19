"use client"

import * as React from "react"
import { IconEye, IconPencil } from "@tabler/icons-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { WritePostEditorActions } from "./write-post-editor-actions";
import { LinkedInPreview } from "./linkedin-preview";
import { useFileUpload } from "../upload-files-context";
import { publishPost } from "@/app/actions/post";
import confetti from "canvas-confetti";
import { toast } from 'sonner'
import { type Id } from "@/convex/_generated/dataModel";

type PostContextProps = {
  content: string
  urlRef: string
  isLoading: boolean
  isPublished: boolean
  isSuccess: boolean
  updatedAt?: number
  onSetContent: (content: string) => void
  onPublishDraft: (comment?: string) => void
  onSaveDraft: () => void
}

export const WritePostContext = React.createContext<PostContextProps | null>(null);

function useWritePost() {
  const context = React.useContext(WritePostContext);

  if (!context) {
    throw new Error("useWritePost must be used within a <WritePost />");
  }

  return context;
}

const WritePost = ({ postId }: { postId: Id<"posts"> }) => {
  const [content, setContent] = React.useState<string | null>()
  const [isLoading, setIsLoading] = React.useState(false)
  const isMobile = useMediaQuery("(max-width: 1280px)");

  const canvas = React.useRef<HTMLCanvasElement>(null);
  const successRef = React.useRef(false);
  const urlRef = React.useRef("");
  // const fileIdRef = React.useRef<Id<"_storage"> | undefined>()

  const { file, draftImg, onSetDraftImg } = useFileUpload()

  const post = useQuery(api.posts.getPost, { postId })
  const updatePost = useMutation(api.posts.updatePost)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  React.useEffect(() => {
    if (post?.content) {
      setContent(post.content)
    }
  }, [post])

  React.useEffect(() => {
    if (post?.fileUrl) {
      onSetDraftImg(post.fileUrl)
    }
  }, [post?.fileUrl])

  if (!content) {
    // add skeleton loader
    return <span className="font-semibold p-4">Cargando...</span>
  }

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

  const handlePublish = async (comment?: string) => {
    setIsLoading(true)

    let formData: null | FormData = null
    let fileId: Id<"_storage"> | undefined = undefined

    if (file && !draftImg) {
      const storageId = await getConvexStorageId(file)
      fileId = storageId
      formData = new FormData()
      formData.append("file", file)
    }

    const result = await publishPost({ text: content, comment, file: formData })

    if (result && 'error' in result) {
      toast.error(result.error) // use toast
      setIsLoading(false)
      return
    }

    if (result.postUrn) {
      await updatePost({
        postId,
        content,
        status: "published",
        postUrn: result.postUrn,
        fileId,
        fileType: file?.type
      })

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

  const handleDraft = async () => {
    if (urlRef.current !== "" && urlRef.current) {
      toast.info("No puedes guardar un borrador después de publicar")
      return
    }

    setIsLoading(true)

    try {
      if (file && !draftImg) {
        const fileId = await getConvexStorageId(file)

        await updatePost({ postId, content, status: "draft", fileId, fileType: file.type })
      } else {
        await updatePost({ postId, content, status: "draft" })
      }

      toast.success("Borrador guardado")
    } catch {
      toast.error("Error al guardar el borrador")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <WritePostContext.Provider
      value={{
        content,
        isLoading,
        isPublished: post?.status === "published",
        urlRef: urlRef.current,
        isSuccess: successRef.current,
        updatedAt: post?.updatedAt,
        onSetContent: setContent,
        onSaveDraft: handleDraft,
        onPublishDraft: handlePublish
      }}
    >
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
            <WritePostEditorActions />
          </TabsContent>
          <TabsContent value="preview">
            <div className="flex justify-center bg-accent p-4 rounded h-full">
              <LinkedInPreview
                content={content}
                author={post?.author}
                fileId={post?.fileId}
                fileType={post?.fileType}
                isPublished={post?.status === "published"}
              />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid xl:grid-cols-2 gap-x-2 h-full overflow-y-auto">
          <div className="flex flex-col">
            <WritePostEditorActions />
          </div>
          <div className="flex justify-center bg-accent p-4 rounded h-full">
            <LinkedInPreview
              content={content}
              author={post?.author}
              fileId={post?.fileId}
              fileType={post?.fileType}
              isPublished={post?.status === "published"}
            />
          </div>
        </div>
      )}
    </WritePostContext.Provider>
  )
}

export {
  WritePost,
  useWritePost
}
