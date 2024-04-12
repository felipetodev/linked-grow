"use client"

import { useEffect, useRef, useState } from "react"
import { IconSend } from "@tabler/icons-react";
import Editor from "./editor/advanced-editor";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LinkedInPreview } from "./linkedin-preview";
import { PostConfirmModal } from "./post-confirm-modal";
import { publishPost } from "@/app/actions/post";
import { toast } from 'sonner'
import confetti from "canvas-confetti";
import { Id } from "@/convex/_generated/dataModel";

export function WritePost({ postId }: { postId: Id<"posts"> }) {
  const [content, setContent] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useMediaQuery("(max-width: 1280px)");

  const canvas = useRef<HTMLCanvasElement>(null);
  const successRef = useRef(false);
  const urlRef = useRef("");

  const post = useQuery(api.posts.getPost, { postId })
  const updatePost = useMutation(api.posts.updatePost)

  useEffect(() => {
    if (post?.content) {
      setContent(post.content)
    }
  }, [post])

  if (!content) {
    // add skeleton loader
    return <span className="font-semibold p-4">Cargando...</span>
  }

  const handlePublish = async (comment?: string) => {
    setIsLoading(true)

    const result = await publishPost({ text: content, comment })

    if (result && 'error' in result) {
      toast.error(result.error) // use toast
      setIsLoading(false)
      return
    }

    if (result.postUrn) {
      await updatePost({ postId, content, status: "published", postUrn: result.postUrn })

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

    try {
      await updatePost({ postId, content, status: "draft" })
      toast.success("Borrador guardado")
    } catch {
      toast.error("Error al guardar el borrador")
    }
  }

  return (
    <>
      {isMobile ? (
        <Tabs defaultValue="editor" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Vista previa</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <Editor text={content} onEditText={setContent} />
            <div className="mt-4 ml-auto space-x-2">
              <Button variant="secondary" onClick={handleDraft}>
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
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="flex justify-center bg-accent p-4 rounded h-full">
              <LinkedInPreview
                content={content}
                author={post?.author}
              />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid xl:grid-cols-2 gap-x-2 overflow-y-auto">
          <div className="flex flex-col">
            <Editor text={content} onEditText={setContent} />
            <div className="mt-4 ml-auto space-x-4">
              <Button variant="secondary" onClick={handleDraft}>
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
            </div>
          </div>
          <div className="flex justify-center bg-accent p-4 rounded">
            <LinkedInPreview
              content={content}
              author={post?.author}
            />
          </div>
        </div>
      )}
    </>
  )
}
