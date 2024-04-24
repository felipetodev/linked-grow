"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconSparkles } from "@tabler/icons-react";
import { PostFormat } from "@/components/posts/post-format";
import { DEFAULT_LEARNINGS_POST } from "@/lib/constants";
import { useActions, useUIState } from "ai/rsc";
import { toast } from "sonner";
import { type AI } from "@/lib/post/actions";

export function LearningForm() {
  const [state, setState] = useState(DEFAULT_LEARNINGS_POST)
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitLearningForm } = useActions()

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full px-1 overflow-y-auto">
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          const { format, ...rest } = state

          if (!rest.message.how.trim() || !!rest.message.learnship.trim()) {
            return toast.warning('Debes ingresar un mensaje')
          }

          try {
            const responseMessage = await submitLearningForm({ ...rest, format: format.template })
            setMessages(currentMessages => [...currentMessages, responseMessage])
          } catch (error) {
            console.error(error)
          }
        }}
        className="md:sticky md:top-6 h-full flex flex-col gap-y-6 mb-6"
      >
        <div className="grid w-full gap-y-4">
          <Label htmlFor="learnship" className="font-semibold">
            ¿Qué aprendiste recientemente?
          </Label>
          <Textarea
            required
            id="learnship"
            name="learnship"
            value={state.message.learnship}
            onChange={({ target }) => setState({
              ...state,
              message: { ...state.message, learnship: target.value }
            })}
            className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
            placeholder="Cómo pasar de Junior a Senior, cómo mejorar tu productividad, etc."
          />
        </div>
        <div className="grid w-full gap-y-4">
          <Label htmlFor="how" className="font-semibold">
            ¿Cómo lo aprendiste?
          </Label>
          <Textarea
            required
            id="how"
            name="how"
            value={state.message.how}
            onChange={({ target }) => setState({
              ...state,
              message: { ...state.message, how: target.value }
            })}
            className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
            placeholder="Con un hilo de Twitter, un video de YouTube, un libro, etc."
          />
        </div>
        <div className="grid w-full gap-y-4">
          <Label htmlFor="keys" className="font-semibold">
            ¿Cuál fue la clave para aprenderlo que te gustaría compartir con otros?
          </Label>
          <Textarea
            required
            id="keys"
            name="keys"
            value={state.message.keys}
            onChange={({ target }) => setState({
              ...state,
              message: { ...state.message, keys: target.value }
            })}
            className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
            placeholder="Buscando mejorar mis habilidades técnicas, mejorando a través de la práctica, etc."
          />
        </div>
        <PostFormat
          type="post"
          state={state}
          onDeleteFormat={() => setState({ ...state, format: DEFAULT_LEARNINGS_POST["format"] })}
          onFormatChange={(value) => {
            setState({ ...state, format: value })
          }}
        />
        <Button className="group font-semibold" aria-label="Generar post">
          <IconSparkles className="mr-2 transition-transform group-hover:rotate-[45deg] group-hover:scale-110" />
          Generar post
        </Button>
      </form>
      <div className="flex flex-col w-full gap-y-4">
        <h3 className="font-semibold">
          Output
        </h3>
        <span className="text-xs">
          Aquí se mostrará el contenido generado por la IA. Puedes modificarlo y personalizarlo a tu gusto.
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
