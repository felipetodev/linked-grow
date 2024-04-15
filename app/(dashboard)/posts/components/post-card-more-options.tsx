import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react"
import { toast } from "sonner";

const url = 'https://www.linkedin.com'

export function PostCardMoreOptions({ postUrn }: { postUrn?: string }) {
  return (
    <div className="absolute top-1 right-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0 size-8">
            <IconDotsVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(`${url}/feed/update/${postUrn}`)
              toast.success('Link copiado')
            }}
          >
            Copiar link del post
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(`<iframe src="${url}/embed/feed/update/${postUrn}" height="851" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`)
              toast.success('Embed copiado')
            }}
          >
            Copiar embed del post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
