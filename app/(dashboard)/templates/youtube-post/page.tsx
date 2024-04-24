import { TemplateHeader } from "@/components/template-header";
import { YoutubeForm } from "@/components/youtube/youtube-form";

export default function YouTubePostPage() {
  return (
    <>
      <TemplateHeader
        title="Genera un post desde un video de YouTube"
        description="Crea un post en LinkedIn a partir de un video de YouTube con la ayuda de la inteligencia artificial."
      />
      <YoutubeForm />
    </>
  )
}
