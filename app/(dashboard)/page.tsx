import { FeaturesCards } from "@/components/features-cards"
import { TemplateHeader } from "@/components/template-header"

// interface LayoutProps {
//   children: React.ReactNode
// }

export default async function Layout() {
  return (
    <>
      <TemplateHeader
        title="Genera un post con IA"
        description="Selecciona una plantilla y genera un post con inteligencia artificial"
      />
      <FeaturesCards />
    </>
  )
}
