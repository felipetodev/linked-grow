/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import TimeAgo from "@/lib/hooks/use-time-ago"
import { CardFooterDraft } from "./card-footer-draft"
import { CardFooterPublished } from "./card-footer-published"
import { PostCardMoreOptions } from "./post-card-more-options"
import { PostUserAvatar } from "./post-user-avatar"
import { IconLoader } from "@tabler/icons-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { type Doc } from "@/convex/_generated/dataModel"

const maxChars = 200

export function PostCard({
  _id: postId,
  content,
  status,
  author,
  postUrn,
  fileUrl,
  fileId,
  fileType,
  updatedAt,
}: Doc<"posts">) {
  const [isLoading, setIsLoading] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const contentLength = content.length
  const content_ = contentLength > maxChars ? content.slice(0, maxChars) + '...' : content
  const router = useRouter()

  const createPost = useMutation(api.posts.createPost)

  const handleCreatePostCopy = async () => {
    setIsLoading(true)
    const postId = await createPost({ content, fileId, status: 'draft' })

    toast.success('Post copiado como borrador')
    router.push(`/new/${postId}`)
  }

  return (
    <div className={cn("relative grid border h-max p-4 rounded shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl", {
      'h-[400px] max-h-[400px]': !fileUrl
    })}>
      <div className="flex items-center mb-4">
        <PostUserAvatar />
        <div className="ml-2 flex-1 overflow-hidden px-1">
          <div className="font-semibold text-sm">
            {author ?? 'User'}
          </div>
          <div className="block items-center text-xs opacity-60">
            <span>
              Ultima actualización{' '}
              <TimeAgo timestamp={updatedAt} />
            </span>
            <span className=" mx-1" aria-label="hidden">•</span>{' '}
            <span>{content.length} caracteres</span>
          </div>
        </div>
      </div>
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 line-clamp-[15]"
        components={{
          p({ children }) {
            return <p className="mb-1 last:mb-0">{children}</p>
          }
        }}
      >
        {content_}
      </MemoizedReactMarkdown>
      {(fileUrl && fileType?.includes("image")) && (
        <div className="my-4">
          <img
            src={fileUrl}
            alt="file"
            className="size-full max-h-[350px] object-contain"
          />
        </div>
      )}
      {(fileUrl && fileType?.includes("video")) && (
        <div className="my-4">
          <video
            controls
            className="size-full max-h-[350px] object-contain"
          >
            <source src={fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {status === 'draft' && <CardFooterDraft postId={postId} />}
      {status === 'published' && (
        <CardFooterPublished
          postUrn={postUrn}
          onCopyPost={handleCreatePostCopy}
        />
      )}
      {isLoading && (
        <div className="text-primary flex flex-col justify-center items-center absolute inset-0 size-full backdrop-blur-sm bg-background/30">
          <h2 className="font-semibold">Copiando contenido como borrador</h2>
          <span className="text-sm font-medium">Por favor, espere...</span>
          <IconLoader className="animate-spin size-8 mt-4" />
        </div>
      )}
      {status === 'published' && (
        <PostCardMoreOptions postUrn={postUrn} />
      )}
    </div>
  )
}
