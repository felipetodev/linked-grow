import { WritePost } from "@/components/write/write-post"
import { api } from "@/convex/_generated/api"
import { preloadQuery } from "convex/nextjs"
import { type Id } from "@/convex/_generated/dataModel"

type Props = {
  params: {
    id: Id<"posts">
  }
}

export default async function NewPostPage({ params: { id } }: Props) {
  const preloadedPost = await preloadQuery(api.posts.getPost, { postId: id });

  return (
    <WritePost postId={id} preloadedPost={preloadedPost} />
  )
}
