import Link from "next/link";
import TimeAgo from "@/lib/hooks/use-time-ago";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconSparkles, IconTrash } from "@tabler/icons-react";
import { type Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Props = {
  ideas: Array<{
    _id: Id<"ideas">
    _creationTime: number
    content: string
    author: string
    userId: string
  }> | undefined
  onDelete: (id: Id<"ideas">) => void
}

export function IdeasPublished({ ideas, onDelete }: Props) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(250px,300px))]">
      {ideas?.map(({ content, _id: id, _creationTime: createdAt }) => (
        <div key={id} className="grid gap-y-4 rounded border p-2">
          <header>
            <span className="text-xs font-semibold">
              Creado{' '}
              <TimeAgo timestamp={createdAt} />
            </span>
          </header>
          <p className="min-h-24">{content}</p>
          <footer className="flex gap-x-2 w-full">
            <Link
              href={{
                pathname: `/templates/${id}`,
                query: { message: content }
              }}
              className={cn(buttonVariants({ size: "sm" }), "size-9 p-0 w-full")}
            >
              <IconSparkles size={20} />
            </Link>
            <Button
              size="sm"
              className="size-9 p-0 w-full"
              onClick={() => onDelete(id)}
            >
              <IconTrash size={20} />
            </Button>
          </footer>
        </div>
      ))}
    </div>
  )
}
