import Link from "next/link";
import { Separator } from "./ui/separator";
import {
  IconBook,
  IconBrandYoutube,
  IconBriefcase,
  IconFileDescription
} from "@tabler/icons-react";

const randomId = crypto.randomUUID()

const FEATURES_CARDS = [
  {
    href: `/templates/${randomId}`,
    title: "Genera un post con IA desde una plantilla",
    description: "Usa el poder de la inteligencia artificial para generar contenido de calidad en tus post de LinkedIn.",
    active: true,
    icon: <IconFileDescription size={30} />,
  },
  {
    href: '/templates/learnings',
    title: "Comparte detalles de tu aprendizaje",
    description: "Comparte tus aprendizajes recientes en un post generado IA.",
    active: true,
    icon: <IconBook size={30} />,
  },
  {
    href: "/templates/job-description",
    title: "Genera una descripción de trabajo con IA",
    description: "Crea una descripción de trabajo precisa, atractiva y profesional para tus ofertas de empleo.",
    active: true,
    icon: <IconBriefcase size={30} />,
  },
  {
    href: '/templates/youtube-post',
    title: "Genera un post con IA desde un video de YouTube",
    description: "Comparte tus videos de YouTube en LinkedIn con un post generado por inteligencia artificial.",
    active: false,
    icon: <IconBrandYoutube size={30} />,
  },
  {
    href: '/mock',
    title: "Feature",
    description: "Mock",
    active: false,
    icon: <IconBrandYoutube size={30} />,
  }
]

export function FeaturesCards() {
  return (
    <div className="animate-fade-in-up grid gap-8 grid-cols-[repeat(auto-fill,_minmax(280px,1fr))]">
      {
        FEATURES_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            aria-disabled={!card.active}
            className="relative flex flex-col min-h-[250px] px-2 py-4 bg-gradient-to-br from-pink-500 to-purple-900 rounded transition duration-300 hover:-translate-y-2 hover:shadow-xl aria-disabled:pointer-events-none aria-disabled:opacity-90"
          >
            <h2 className="text-2xl font-semibold my-4 self-end text-white">
              {card.title}{" "}
              <span className="inline-block align-bottom p-1 text-purple-300 shadow-sm rounded-lg">
                {card.icon}
              </span>
              {" "}
            </h2>
            <Separator className="mb-4" />
            <span className="text-sm text-white">
              {card.description}
            </span>
            {!card.active && (
              <span className="absolute top-1.5 right-1.5 text-xs font-medium px-2.5 py-0.5 rounded border bg-purple-500 text-purple-200">
                Soon
              </span>
            )}
          </Link>
        ))}
    </div>
  )
}
