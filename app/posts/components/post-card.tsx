import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import TimeAgo from "@/lib/hooks/use-time-ago"
import { CardFooterDraft } from "./card-footer-draft"
import { type Id } from "@/convex/_generated/dataModel"
import { CardFooterPublished } from "./card-footer-published"

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
  const contentLength = content.length
  const content_ = contentLength > maxChars ? content.slice(0, maxChars) + '...' : content

  return (
    <div className="grid border h-[400px] max-h-[400px] p-4 rounded shadow-lg overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl">
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
      {status === 'published' && <CardFooterPublished postUrn={postUrn} />}
    </div>
  )
}
