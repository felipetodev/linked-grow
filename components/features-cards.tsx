import Link from "next/link";
import { Separator } from "./ui/separator";

const randomId = crypto.randomUUID()

const FEATURES_CARDS = [
  {
    href: `/templates/${randomId}`,
    title: "Genera un post con IA desde una plantilla",
    description: "Usa el poder de la inteligencia artificial para generar contenido de calidad en tus post de LinkedIn.",
  },
  {
    href: '/templates/youtube-post',
    title: "Genera un post con IA desde un video de YouTube (PRONTO)",
    description: "Comparte tus videos de YouTube en LinkedIn con un post generado por inteligencia artificial.",
  },
]

export function FeaturesCards() {
  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(210px,250px))]">
      {
        FEATURES_CARDS.map((card) => (
          <Link key={card.href} href={card.href} className="hover:opacity-80 flex flex-col p-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded transition-opacity">
            <h2 className="text-2xl font-semibold my-4">
              {card.title}
            </h2>
            <Separator className="mb-4" />
            <span className="text-xs">
              {card.description}
            </span>
          </Link>
        ))}
    </div>
  )
}
