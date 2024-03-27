'use client'

import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { Label, labelVariants } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconPlus, IconSparkles } from "@tabler/icons-react";
import { AI } from "@/lib/post/actions";
import { cn } from "@/lib/utils";

type Props = {
  tones: { value: string; label: string }[]
}

export function PostForm({ tones }: Props) {
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()

  const [state, setState] = useState({
    message: '',
    tone: '',
    format: ''
  })

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          try {
            const responseMessage = await submitUserMessage(state)
            setMessages(currentMessages => [...currentMessages, responseMessage])
          } catch (error) {
            console.error(error)
          }
        }}
        className="flex flex-col gap-y-6"
      >
        <div className="grid w-full gap-y-4">
          <Label htmlFor="message" className="font-semibold">
            ¿Sobre que tema quieres escribir un post?
          </Label>
          <Textarea
            required
            name="message"
            className="resize-none min-h-[150px] max-h-[300px] [field-sizing:content]"
            placeholder="Escribe aquí tu contenido..."
            id="message"
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          />
        </div>

        <div className="grid gap-y-4 flex-wrap max-w-[400px]">
          <Label htmlFor="tone" className="font-semibold">
            Sobre que tema quieres escribir?
          </Label>
          <ToggleGroup
            id="tone"
            type="single"
            className="flex-wrap justify-start"
            onValueChange={(value) => setState({ ...state, tone: value })}
          >
            {tones.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                aria-label={option.label}
                variant='default'
                className="w-fit border rounded"
              >
                {option.label}
              </ToggleGroupItem>

            ))}
          </ToggleGroup>
        </div>

        <div className="grid w-full gap-y-4">
          <Label htmlFor="format" className="font-semibold">
            Selecciona un formato de post
          </Label>
          <Button
            id="format"
            variant='secondary'
            type='button'
            onClick={() => console.log('open modal')}
            className="w-fit"
          >
            <IconPlus className="mr-2" /> Formato de post
          </Button>
        </div>

        {/* <Button
          disabled={isLoading}
          className="font-semibold"
          aria-label="Generando post..."
        >
          <IconLoader className="mr-2 animate-spin" />Generando post...
        </Button> */}

        <Button className="group font-semibold" aria-label="Generar post">
          <IconSparkles className="mr-2 transition-transform group-hover:rotate-[45deg] group-hover:scale-110" />
          Generar post
        </Button>

      </form>
      <div>
        <div>
          <div className="grid w-full gap-y-4">
            <h3 className={cn(labelVariants(), 'font-semibold')}>
              Output
            </h3>
            <span className="text-xs">
              Aquí se mostrará el contenido generado por la IA. Puedes modificarlo y personalizarlo a tu gusto.
            </span>
            {messages.map((message, index) => (
              <div key={message.id}>
                {message.display}
                {index < messages.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
