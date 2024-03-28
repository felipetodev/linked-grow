"use client"

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, labelVariants } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IconSparkles } from "@tabler/icons-react";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/post/actions";

export function IdeasForm() {
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          try {
            const message = inputRef.current?.value

            if (!message) return alert('Debes ingresar un mensaje')
            const responseMessage = await submitUserMessage({ message, type: 'ideas' })
            setMessages([responseMessage])
          } catch (error) {
            console.error(error)
          }
        }}
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
