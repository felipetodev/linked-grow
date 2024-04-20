import { TemplateHeader } from "@/components/template-header";
import { PostForm } from "@/components/posts/post-form";
import { TONE_OPTIONS } from "@/lib/constants";

type TemplatesPageProps = {
  params: {
    id: string
  }
  searchParams: {
    message: string
  }
}

export default function Templates({ searchParams }: TemplatesPageProps) {
  return (
    <>
      <TemplateHeader
        title="Genera un post desde cero"
        description="Usa el poder de la IA para generar contenido de calidad y atractivo para tu audiencia."
      />
      <PostForm
        tones={TONE_OPTIONS}
        initialPost={searchParams.message}
      />
    </>
  )
}
