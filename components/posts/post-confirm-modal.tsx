import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconLoader, IconX } from "@tabler/icons-react"
import { buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
import { cn } from "@/lib/utils"

const randomId = crypto.randomUUID()

function SuccessView({ urlRef }: { urlRef: string }) {
  return (
    <div className="relative grid gap-y-2 place-items-center">
      <Image src="/task-done.svg" width={300} height={300} alt="success" />
      <h2 className="text-xl font-semibold">
        ¡Post publicado con éxito!
      </h2>
      <span className="text-sm">
        Tu post ya está visible para todos tus contactos y seguidores.
      </span>
      <div className="space-x-4 mt-4">
        <a
          className={cn(buttonVariants({ variant: "secondary" }))}
          href={`https://www.linkedin.com/feed/update/${urlRef}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver post en LinkedIn
        </a>
        <Link
          href={`/templates/${randomId}`}
          className={cn(buttonVariants())}
        >
          Crear nuevo post
        </Link>
      </div>
      <AlertDialogCancel className="absolute top-0 right-0 px-0.5 h-6">
        <IconX className="h-4 w-4" />
      </AlertDialogCancel>
    </div>
  )
}

type Props = {
  urlRef: string
  isSuccess: boolean
  isLoading: boolean
  isPublished?: boolean
  children: React.ReactNode
  onPublish: (comment?: string) => void
}

export function PostConfirmModal({
  urlRef,
  isLoading,
  isSuccess,
  isPublished,
  children,
  onPublish
}: Props) {
  const inputText = useRef<HTMLTextAreaElement>(null)
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        {(isSuccess || isPublished) ? (
          <SuccessView urlRef={urlRef} />
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Publicar post
              </AlertDialogTitle>
              <AlertDialogDescription>
                <span>¿Estás seguro de que deseas publicar este post?</span>
                <span className="block mt-2">
                  Tu post será visible para todos tus contactos y seguidores.
                </span>
              </AlertDialogDescription>
              <div className="grid pt-6">
                <Label htmlFor="comment">
                  Comentario
                </Label>
                <Textarea
                  id="comment"
                  ref={inputText}
                  className="mt-4 resize-none min-h-[150px] max-h-[300px] [field-sizing:content]"
                  placeholder="Añade un primer comentario o link a tu post (opcional)"
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  onPublish(inputText.current?.value)
                }}
              >
                {isLoading
                  ? <IconLoader size={20} className="animate-spin" />
                  : <>Publicar ahora</>}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
