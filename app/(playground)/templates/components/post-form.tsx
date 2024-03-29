'use client'

import { useState, useEffect } from "react";
import { useActions, useUIState } from "ai/rsc";
import { Label, labelVariants } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PostFormatDialog } from "./post-format-dialog";
import { IconPlus, IconSparkles, IconX } from "@tabler/icons-react";
import { AI } from "@/lib/post/actions";
import { cn } from "@/lib/utils";
import { EMPTY_FORMAT } from "@/lib/constants";
import type { PostGenerator, Tone, ToneOptions } from "@/lib/types";

const DEFAULT_POST: PostGenerator = {
  message: '',
  tone: '',
  format: { type: 'post-generator', format: '', value: '' },
  type: 'post'
}

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
            const responseMessage = await submitUserMessage({ ...rest, format: format.format, type: 'post' })
            setMessages(currentMessages => [...currentMessages, responseMessage])
          } catch (error) {
            console.error(error)
          }
        }}
        className="sticky top-6 h-max flex flex-col gap-y-6"
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

        <div className="grid w-full gap-y-4">
          <Label htmlFor="format" className="font-semibold">
            Selecciona un formato de post
          </Label>

          {state.format?.format ? (
            <div className="p-4 border rounded max-w-md">
              <div className="grid">
                <h2 className="truncate overflow-hidden">
                  {state.format.format.split(' ', 12).join(' ')}
                </h2>
                <h4 className="truncate text-xs opacity-50">
                  {state.format.format.split(' ').slice(12).join(' ').split(' ', 10).join(' ')}
                </h4>
              </div>
              <div className="flex justify-between mt-2">
                <PostFormatDialog
                  onFormatChange={(value) => setState({ ...state, format: value })}
                  selectedTemplate={Number(state.format.value)}
                >
                  <Button
                    id="format"
                    className="w-fit"
                    variant='secondary'
                    type='button'
                    size='sm'
                  >
                    Editar formato seleccionado
                  </Button>
                </PostFormatDialog>

                <Button
                  id="format"
                  className="w-fit"
                  variant='destructive'
                  type='button'
                  size='sm'
                  onClick={() => setState({ ...state, format: EMPTY_FORMAT })}
                >
                  <IconX size={20} className="mr-1" /> Remover
                </Button>
              </div>
            </div>
          ) : (
            <PostFormatDialog
              onFormatChange={(value) => setState({ ...state, format: value })}
            >
              <Button
                id="format"
                variant='secondary'
                type='button'
                className="w-fit"
                size='sm'
              >
                <IconPlus className="mr-2" /> Formato de post
              </Button>
            </PostFormatDialog>
          )}
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
