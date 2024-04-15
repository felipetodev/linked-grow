import { TemplateHeader } from "@/components/template-header";
import { AI } from "@/lib/post/actions";
import { IdeasTabs } from "./components/ideas-context";

export default function IdeasPage() {
  return (
    <AI>
      <TemplateHeader
        title="Genera ideas con IA"
        description="Genera ideas para tus posts de LinkedIn"
      />
      <IdeasTabs />
    </AI>
  )
}
