'use client'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IconPlus } from "@tabler/icons-react";

const TOGGLE_OPTIONS = [
  { value: "excited", label: "😃 Entusiasta" },
  { value: "professional", label: "👔 Profesional" },
  { value: "friendly", label: "👋 Amigable" },
  { value: "formal", label: "🎩 Formal" },
  { value: "encouraging", label: "🌟 Motivador" },
  { value: "funny", label: "😄 Divertido" },
  { value: "dramatic", label: "🎭 Dramático" },
  { value: "candid", label: "🤫 Sincero" },
  { value: "casual", label: "😎 Casual" },
  { value: "convincing", label: "🤔 Persuasivo" },
  { value: "creative", label: "🎨 Creativo" },
  { value: "passionate", label: "🔥 Apasionado" },
  { value: "informative", label: "📚 Informativo" }
]

export function PostForm () {
  return (
    <form
    onSubmit={e => e.preventDefault()}
    className="flex flex-col gap-y-6"
  >
    <div className="grid w-full gap-y-4">
      <Label htmlFor="message" className="font-semibold">
        Sobre que tema quieres escribir?
      </Label>
      <Textarea
        className="resize-none min-h-[190px] max-h-[400px] [field-sizing:content]"
        placeholder="Escribe aquí tu contenido..."
        id="message"
      />
    </div>

    <div className="grid gap-y-4 flex-wrap max-w-[400px]">
      <Label htmlFor="tone" className="font-semibold">
        Sobre que tema quieres escribir?
      </Label>
      <ToggleGroup id="tone" type="single" className="flex-wrap justify-start">
        {TOGGLE_OPTIONS.map((option) => (
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
      <Button type='button' onClick={() => console.log('open modal')} id="format" className="w-fit">
        <IconPlus className="mr-2" /> formato de post
      </Button>
    </div>
  </form>
  )
}