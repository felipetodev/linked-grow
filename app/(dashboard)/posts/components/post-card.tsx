import { useState } from "react"
import { useRouter } from "next/navigation"
import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import TimeAgo from "@/lib/hooks/use-time-ago"
import { CardFooterDraft } from "./card-footer-draft"
import { CardFooterPublished } from "./card-footer-published"
import { PostCardMoreOptions } from "./post-card-more-options"
import { IconLoader } from "@tabler/icons-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { type Id } from "@/convex/_generated/dataModel"

const maxChars = 200

type Props = {
  status: "draft" | "published"
  content: string
  author: string
  _id: Id<"posts">
  updatedAt: number
  postUrn?: string
}

export function PostCard({
  _id: postId,
  content,
  status,
  author,
  postUrn,
  updatedAt,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const contentLength = content.length
  const content_ = contentLength > maxChars ? content.slice(0, maxChars) + '...' : content
  const router = useRouter()

  const createPost = useMutation(api.posts.createPost)

  const handleCreatePostCopy = async () => {
    setIsLoading(true)
    const postId = await createPost({ content, status: 'draft' })

    toast.success('Post copiado como borrador')
    router.push(`/new/${postId}`)
  }

  return (
    <div className="relative grid border h-[400px] max-h-[400px] p-4 rounded shadow-lg overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <div className="flex justify-center items-center size-[48px] p-4 border rounded-full bg-background ">
          {author?.split(' ').map(name => name[0]).join('') ?? 'U'}
        </div>
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
