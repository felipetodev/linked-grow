import Link from "next/link"
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
import { Button, buttonVariants } from "@/components/ui/button"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { type Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function CardFooterDraft({ postId }: { postId: Id<"posts"> }) {
  const deletePost = useMutation(api.posts.deletePost)
  return (
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
  )
}
