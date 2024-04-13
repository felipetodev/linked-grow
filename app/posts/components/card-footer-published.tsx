import { Button, buttonVariants } from "@/components/ui/button"
import { IconCopy, IconLink } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Props = {
  postUrn?: string
  onCopyPost: () => void
}

export function CardFooterPublished({ postUrn, onCopyPost }: Props) {
  return (
    <footer className="flex gap-4 mt-auto">
      <a
        href={`https://www.linkedin.com/feed/update/${postUrn}/`}
        className={cn(buttonVariants(), "w-full")}
        rel="noopener noreferrer"
        target="_blank"
      >
        Ver post
        <IconLink size={20} className="ml-2" />
      </a>
      <Button className="w-full" onClick={onCopyPost}>
        Copiar
        <IconCopy size={20} className="ml-2" />
      </Button>
    </footer>
  )
}
