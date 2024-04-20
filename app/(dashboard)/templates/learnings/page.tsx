import { LearningForm } from "@/components/learnings/learnings-form";
import { TemplateHeader } from "@/components/template-header";

export default function JobDescriptionPage() {
  return (
    <>
      <TemplateHeader
        title="Comparte detalles de tu aprendizaje"
        description="Comparte tus aprendizajes recientes en un post generado por IA."
      />
      <LearningForm />
    </>
  )
}
