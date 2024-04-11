import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const maxChars = 200

export function PostCard({ content, author, _id: id }: { content: string, author: string, _id: string }) {
  const contentLength = content.length
  const content_ = contentLength > maxChars ? content.slice(0, maxChars) + '...' : content

  return (
    <div className="grid border h-[400px] max-h-[400px] p-4 rounded shadow-lg overflow-hidden">
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
              Ultima actualización hace {Math.floor(Math.random() * 20)} horas
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
      <footer className="flex gap-4 mt-auto">
        <Link href={`/new/${id}`} className={cn(buttonVariants(), 'w-full')}>
          <IconEdit size={20} />
        </Link>
        <Button className="w-full" variant='destructive'>
          <IconTrash size={20} />
        </Button>
      </footer>
    </div>
  )
}
