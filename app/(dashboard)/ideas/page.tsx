import { TemplateHeader } from "@/components/template-header";
import { AI } from "@/lib/post/actions";
import { IdeasTabs } from "./components/ideas-context";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function IdeasPage() {
  const preloadedIdeas = await preloadQuery(api.ideas.getPostsIdeas);
  return (
    <AI>
      <TemplateHeader
        title="Genera ideas con IA"
        description="Genera ideas para tus posts de LinkedIn"
      />
      <IdeasTabs preloadedIdeas={preloadedIdeas} />
    </AI>
  )
}
