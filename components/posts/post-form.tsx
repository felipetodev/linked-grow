'use client'

import { useState, useEffect } from "react";
import { useActions, useUIState } from "ai/rsc";
import { Label, labelVariants } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconSparkles } from "@tabler/icons-react";
import { PostFormat } from "./post-format";
import { AI } from "@/lib/post/actions";
import { cn } from "@/lib/utils";
import { DEFAULT_POST, EMPTY_FORMAT } from "@/lib/constants";
import type { Tone, ToneOptions } from "@/lib/types";

export function PostForm({ tones, initialPost }: { tones: ToneOptions, initialPost?: string }) {
  const [state, setState] = useState(DEFAULT_POST)
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()

  useEffect(() => {
    if (initialPost) {
      setState({ ...state, message: initialPost })
    }
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          const { format, ...rest } = state

          try {
            const responseMessage = await submitUserMessage({ ...rest, format: format.template, type: 'post' })
            setMessages(currentMessages => [...currentMessages, responseMessage])
          } catch (error) {
            console.error(error)
          }
        }}
        className="md:sticky md:top-6 h-max flex flex-col gap-y-6"
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
            onValueChange={(value: Tone) => setState({ ...state, tone: value })}
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

        <PostFormat
          type="post"
          state={state}
          onDeleteFormat={() => setState({ ...state, format: EMPTY_FORMAT })}
          onFormatChange={(value) => setState({ ...state, format: value })}
        />

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
      <div className="flex flex-col w-full gap-y-4">
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
  )
}
