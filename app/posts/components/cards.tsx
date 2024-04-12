import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { PostCard } from "./post-card"
import { CardsSkeleton } from "./cards-skeleton"

export function Cards({ status }: { status: "draft" | "published" }) {
  const posts = useQuery(api.posts.getPosts, { status })

  if (!posts) return <CardsSkeleton repeat={6} />

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,1fr))]">
      {posts.length > 0 ? posts.map(post => (
        <PostCard key={post._id} {...post} />
      )) : (
        <h2 className="text-xl font-semibold">
          No hay posts {status === "draft" ? "en borrador" : "publicados"}
        </h2>
      )}
    </div>
  )
}
