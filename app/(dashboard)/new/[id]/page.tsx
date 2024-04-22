import { WritePost } from "@/components/write/write-post"
import { type Id } from "@/convex/_generated/dataModel"

type Props = {
  params: {
    id: Id<"posts">
  }
}

export default async function NewPostPage({ params: { id } }: Props) {
  return (
    <WritePost postId={id} />
  )
}
