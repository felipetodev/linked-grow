import { Suspense } from "react"
import MembershipSSR from "@/components/memberships-ssr"
import { WritePost } from "@/components/write/write-post"
import { type Id } from "@/convex/_generated/dataModel"

type Props = {
  params: {
    id: Id<"posts">
  }
}

export default async function NewPostPage({ params: { id } }: Props) {
  return (
    <>
      <div className="hidden xl:grid md:grid-cols-2 bg-background px-4 py-2 rounded mb-2">
        <div className="flex items-center border-r font-semibold">
          Editar / Crear Post
          <Suspense fallback={<></>}>
            <MembershipSSR />
          </Suspense>
        </div>
        <div className="ml-4 flex items-center font-semibold">
          Post Preview
        </div>
      </div>
      <WritePost postId={id} />
    </>
  )
}
