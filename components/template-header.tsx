"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { IconCircleArrowLeft, IconMessageShare, IconPencil } from "@tabler/icons-react";

type Props = {
  title: string
  description: string
}

function getSearchParamsValue(searchParams: URLSearchParams, key: string): string {
  return searchParams.get(key) ?? ""
}

export function TemplateHeader({ title, description }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const status = getSearchParamsValue(searchParams, "status");
  return (
    <nav className="flex flex-col gap-y-2 mb-6">
      {pathname !== "/" && (
        <Button
          variant="ghost"
          className="w-max h-7 p-0 text-xs"
          onClick={() => history.back()}
        >
          <IconCircleArrowLeft size={16} className="mr-1" />
          Volver atrás
        </Button>
      )}
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
