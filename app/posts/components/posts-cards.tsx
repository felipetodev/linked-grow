"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { PostCard } from "./post-card"

export function PostsCards() {
  const posts = useQuery(api.posts.getPosts)

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,1fr))]">
      {posts?.map(post => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  )
}
