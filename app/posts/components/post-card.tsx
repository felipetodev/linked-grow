import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { type Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import TimeAgo from "@/lib/hooks/use-time-ago"

const maxChars = 200

type Props = {
  content: string
  author: string
  _id: Id<"posts">
  updatedAt: number
}

export function PostCard({ content, author, _id: postId, updatedAt }: Props) {
  const contentLength = content.length
  const content_ = contentLength > maxChars ? content.slice(0, maxChars) + '...' : content

  const deletePost = useMutation(api.posts.deletePost)

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
      <footer className="flex gap-4 mt-auto">
        <Link href={`/new/${postId}`} className={cn(buttonVariants(), 'w-full')}>
          <IconEdit size={20} />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full" variant='destructive'>
              <IconTrash size={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estas seguro de eliminar este post?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer.
                Se eliminará permanentemente el post de nuestra base de datos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    await deletePost({ postId })
                    toast.success("Post eliminado")
                  } catch {
                    toast.error("Error al eliminar el post")
                  }
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </div>
  )
}
