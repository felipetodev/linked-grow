import Link from "next/link";
import { Separator } from "./ui/separator";

export function FeaturesCards() {
  const randomId = crypto.randomUUID()
  return (
    <Link href={`/templates/${randomId}`} className="hover:opacity-80 flex flex-col p-2 bg-gradient-to-r from-pink-500 to-yellow-500 h-[250px] w-[250px] rounded transition-opacity">
      <h2 className="text-2xl font-semibold my-4">
        Genera un post con IA desde una plantilla
      </h2>
      <Separator className="mb-10" />
      <span className="text-xs">
        Usa el poder de la inteligencia artificial para generar contenido de calidad en tus post de LinkedIn.
      </span>
    </Link>
  )
}