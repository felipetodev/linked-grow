"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, labelVariants } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IconSparkles } from "@tabler/icons-react";
import { useIdeas } from "./ideas-context";

export function IdeasForm() {
  const { messages, inputRef, onSubmit } = useIdeas()

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full gap-y-4"
      >
        <Label htmlFor="ideas" className="font-semibold">
          Agrega un tema o industria que te interese y genera ideas sobre ello.
        </Label>
        <Input
          required
          id="ideas"
          ref={inputRef}
          placeholder="Marketing digital para emprendedores, Marca personal, Tecnología, etc."
        />
        <Button className="w-fit group font-semibold" aria-label="Generar ideas">
          <IconSparkles className="mr-2 transition-transform group-hover:rotate-[45deg] group-hover:scale-110" />
          Generar post
        </Button>
      </form>
      <div className="flex flex-col w-full gap-y-4">
        <h3 className={cn(labelVariants(), 'font-semibold')}>
          Output
        </h3>
        <span className="text-xs">
          Aquí tienes algunas ideas para tu próximo LinkedIn post.
        </span>
        {messages.map((message) => (
          <div key={message.id}>
            {message.display}
          </div>
        ))}
      </div>
    </div>
  )
}
