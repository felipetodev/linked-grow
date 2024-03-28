import { TemplateHeader } from "@/components/template-header";
import { IdeasForm } from "./components/ideas-form";
import { AI } from "@/lib/post/actions";

export default function IdeasPage() {
  return (
    <AI>
      <TemplateHeader
        title="Genera ideas con IA"
        description="Genera ideas para tus posts de LinkedIn"
      />
      <IdeasForm />
    </AI>
  )
}
