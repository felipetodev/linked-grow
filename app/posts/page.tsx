import { TemplateHeader } from "@/components/template-header";
import { PostsCards } from "./components/posts-cards"

export default function PostsPage() {
  return (
    <>
      <TemplateHeader
        title="Posts generados"
        description="Revisa tus posts generados"
      />
      <PostsCards />
    </>
  )
}
