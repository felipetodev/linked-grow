"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconSparkles } from "@tabler/icons-react";
import { PostFormat } from "@/components/posts/post-format";
import { LiteYoutube } from "./lite-youtube";
import { DEFAULT_YOUTUBE_POST } from "@/lib/constants";
import { useActions, useUIState } from "ai/rsc";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { getVideoId } from "./utils";
import { type AI } from "@/lib/post/actions";

export function YoutubeForm() {
  const [state, setState] = useState(DEFAULT_YOUTUBE_POST)
  const [youtubeUrl, setYoutubeUrl] = useState<string>("")
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitYoutubeForm } = useActions()

  const debouncedUpdates = useDebouncedCallback((youtubeUrl: string) => {
    setYoutubeUrl(youtubeUrl);
  }, 500);

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full px-1 overflow-y-auto">
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          const { format, ...rest } = state

          if (!getVideoId(rest.message.url)) {
            return toast.warning('Debes ingresar una URL valida')
          }

          try {
            const responseMessage = await submitYoutubeForm({ ...rest, format: format.template })
            setMessages(currentMessages => [...currentMessages, responseMessage])
          } catch (error) {
            toast.error((error as Error)?.message)
          }
        }}
        className="md:sticky md:top-6 h-full flex flex-col gap-y-6 mb-6"
      >
        <div className="grid w-full gap-y-4">
          <Label htmlFor="learnship" className="font-semibold">
            Pega el enlace de YouTube que quieres convertir en un post
          </Label>
          <Input
            required
            id="youtube"
            name="youtube"
            placeholder="https://www.youtube.com/watch?v=..."
            onChange={({ target }) => {
              setState({ ...state, message: { url: target.value } })
              debouncedUpdates(target.value)
            }}
          />
        </div>
        <LiteYoutube youtubeUrl={youtubeUrl} />
        <PostFormat
          type="post"
          state={state}
          onDeleteFormat={() => setState({ ...state, format: DEFAULT_YOUTUBE_POST["format"] })}
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
