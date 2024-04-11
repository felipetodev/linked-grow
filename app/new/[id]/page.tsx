import { WritePost } from "@/components/write-post"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  params: {
    id: Id<"posts">
  }
}

export default async function NewPostPage({ params: { id } }: Props) {

  return (
    <>
      <div className="hidden xl:grid md:grid-cols-2 bg-background p-4 rounded mb-2">
        <div className="border-r font-semibold">
          Editar / Crear Post
        </div>
        <div className="ml-4 flex font-semibold">
          Post Preview
        </div>
      </div>
      <WritePost postId={id} />
    </>
  )
}
