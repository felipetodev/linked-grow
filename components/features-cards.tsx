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
    active: false,
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
    title: "Mock",
    description: "Mock",
    active: false,
    icon: <IconBrandYoutube size={30} />,
  }
]

export function FeaturesCards() {
  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(280px,1fr))]">
      {
        FEATURES_CARDS.map((card) => (
          <Link key={card.href} href={card.href} className="flex flex-col min-h-[250px] relative hover:opacity-80 px-2 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded transition-opacity">
            <h2 className="text-2xl font-semibold my-4 self-end">
              {card.title}{" "}
              <span className="inline-block align-bottom p-1 text-purple-500 shadow-sm rounded-lg">
                {card.icon}
              </span>
              {" "}
            </h2>
            <Separator className="mb-4" />
            <span className="text-sm">
              {card.description}
            </span>
            {!card.active && (
              <span className="absolute top-1.5 right-1.5 text-xs font-medium px-2.5 py-0.5 rounded bg-purple-900 text-purple-300">
                Soon
              </span>
            )}
          </Link>
        ))}
    </div>
  )
}
