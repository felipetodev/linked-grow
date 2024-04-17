"use client"

import * as React from "react";
import Image from "next/image";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { MemoizedReactMarkdown } from "@/components/ui/markdown";
import { publishPost } from "@/app/actions/post";
import { PostActions } from "./post-actions";
import { PostHeader } from "./post-header";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useFileUpload } from "@/components/upload-files-context";
import confetti from "canvas-confetti";
import { type StreamableValue } from "ai/rsc";
import { type Id } from "@/convex/_generated/dataModel";

type PostContextProps = {
  postId?: Id<"posts">
  text: string
  urlRef: string
  hasChanges: boolean
  isLoading: boolean
  isSuccess: boolean
  setIsLoading: (value: boolean) => void
  onSave: () => void
  onPublish: (comment?: string) => void
  onEditText: (value: string) => void
};

export const PostContext = React.createContext<PostContextProps | null>(null);

function usePost() {
  const context = React.useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used within a <Post />");
  }

  return context;
}

const Post = React.forwardRef<
  HTMLDivElement,
  { content: string | StreamableValue<string> }
>(({ content }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [postId, setPostId] = React.useState<Id<"posts"> | undefined>()
  const [editText, setEditText] = React.useState<undefined | string>()
  const submittedContent = React.useRef<string | undefined>()
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const successRef = React.useRef(false);
  const urlRef = React.useRef("");
  const fileIdRef = React.useRef<Id<"_storage"> | undefined>()
  const text = useStreamableText(content)

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
    submittedContent.current = editText

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

    if (submittedContent.current === editText && postId) {
      await updatePost({
        content: editText ?? text,
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
        content: editText ?? text,
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

    const result = await publishPost({ text: editText ?? text, comment, file: formData })

    if (result && 'error' in result) {
      toast.error(result.error) // use toast
      setIsLoading(false)
      return
    }

    if (result.postUrn) {
      if (postId) {
        await updatePost({
          postId,
          content: editText ?? text,
          status: "published",
          postUrn: result.postUrn,
          fileId: fileIdRef.current,
          fileType: file?.type
        })
      } else {
        await createPost({
          content: editText ?? text,
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

  const hasChanges = submittedContent.current !== editText

  return (
    <PostContext.Provider
      value={{
        postId,
        isSuccess: successRef.current,
        text: editText ?? text,
        urlRef: urlRef.current,
        hasChanges,
        isLoading,
        setIsLoading,
        onSave: handleSavePost,
        onPublish: handlePublishPost,
        onEditText: setEditText
      }}
    >
      <div
        ref={ref}
        className="border rounded group relative flex flex-col gap-y-8 items-start py-2"
      >
        {text?.length > 0 && (
          <span className="absolute top-0 right-0 font-semibold text-xs opacity-60 px-4 py-2">
            {text.length} caracteres
          </span>
        )}
        <PostHeader />
        <div className="flex-1 space-y-2 overflow-hidden px-4">
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
        {(file?.type.includes("image")) && (
          <Image
            src={URL.createObjectURL(file)}
            alt="file"
            width={0}
            height={500}
            className="size-full max-h-[500px] object-contain"
          />
        )}
        {file?.type.includes("video") && (
          <video
            controls
            className="size-full max-h-[500px] object-contain"
          >
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        )}
        <PostActions />
      </div>
    </PostContext.Provider>
  );
})

Post.displayName = "Post";

export {
  Post,
  usePost
}
