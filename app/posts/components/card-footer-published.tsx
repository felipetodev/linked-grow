import { Button, buttonVariants } from "@/components/ui/button"
import { IconCopy, IconLink } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function CardFooterPublished({ postUrn }: { postUrn?: string }) {
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
      <Button className="w-full" disabled>
        Copiar
        <IconCopy size={20} className="ml-2" />
      </Button>
    </footer>
  )
}
