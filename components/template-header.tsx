"use client"

import { Separator } from "@/components/ui/separator"
import { IconMessageShare, IconPencil } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";

type Props = {
  title: string
  description: string
}

function getSearchParamsValue(searchParams: URLSearchParams, key: string): string {
  return searchParams.get(key) ?? ""
}

export function TemplateHeader({ title, description }: Props) {
  const searchParams = useSearchParams();
  const status = getSearchParamsValue(searchParams, "status");

  return (
    <nav className="flex flex-col gap-y-2 mb-6">
      <div className="flex items-center space-x-2">
        <h2 className="text-4xl font-semibold">
          {title}
        </h2>
        {(status === "draft" || status === "published") && (
          <span className="flex items-center text-sm font-semibold text-foreground/50">
            ({status === "draft" ? "Borradores" : "Publicados"})
            {status === "draft"
              ? <IconMessageShare size={16} className="ml-2" />
              : <IconPencil size={16} className="ml-2" />
            }
          </span>
        )}
      </div>
      <p className="opacity-60">
        {description}
      </p>

      <Separator />
    </nav>
  )
}
