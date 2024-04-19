import { JobForm } from "@/components/job-description/job-form";
import { TemplateHeader } from "@/components/template-header";

export default function JobDescriptionPage() {
  return (
    <>
      <TemplateHeader
        title="Genera una descripción de trabajo atractiva con IA"
        description="Crea una descripción de trabajo atractiva y a la medida de tu empresa."
      />
      <JobForm />
    </>
  )
}
