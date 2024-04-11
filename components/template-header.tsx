import { Separator } from "@/components/ui/separator"

type Props = {
  title: string
  description: string
}

export function TemplateHeader({ title, description }: Props) {
  return (
    <nav className="flex flex-col gap-y-2 mb-6">
      <h2 className="text-4xl font-semibold">
        {title}
      </h2>
      <p className="opacity-60">
        {description}
      </p>

      <Separator />
    </nav>
  )
}
