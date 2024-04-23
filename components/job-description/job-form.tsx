"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PostFormat } from "@/components/posts/post-format"
import { IconSparkles } from "@tabler/icons-react"
import { DEFAULT_JOB_DESCRIPTION, EMPTY_JOB_FORMAT } from "@/lib/constants"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useActions, useUIState } from "ai/rsc"
import { type Tone, type ToneOptions } from "@/lib/types"
import { type AI } from "@/lib/post/actions"

function BadgeNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 bg-primary text-secondary text-xs rounded-full border-2 mr-1">
      {children}
    </span>
  )
}

export function JobForm({ tones }: { tones: ToneOptions }) {
  const [state, setState] = useState(DEFAULT_JOB_DESCRIPTION)
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitJobDescriptionForm } = useActions()

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 h-full px-1 overflow-y-auto">
        <form
          className="md:sticky md:top-6 h-full flex flex-col gap-y-6 mb-6"
          onSubmit={async (e) => {
            e.preventDefault()

            const { format, ...rest } = state

            try {
              const responseMessage = await submitJobDescriptionForm({ ...rest, format: format.template })
              setMessages(currentMessages => [...currentMessages, responseMessage])
            } catch (error) {
              console.error(error)
            }
          }}
        >
          <div className="grid w-full gap-y-4">
            <Label htmlFor="company" className="font-semibold">
              <BadgeNumber>
                1
              </BadgeNumber>
              Nombre de la empresa
            </Label>
            <Input
              required
              id="company"
              name="company"
              value={state.message.company}
              onChange={({ target }) => {
                setState({
                  ...state,
                  message: {
                    ...state.message,
                    company: target.value,
                  },
                })
              }}
              autoComplete="off"
              className="[field-sizing:content]"
              placeholder="Google, Facebook, Amazon, Netflix, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="job-position" className="font-semibold">
              <BadgeNumber>
                2
              </BadgeNumber>
              Descripción del trabajo
            </Label>
            <Input
              required
              id="job-position"
              name="job-position"
              value={state.message.jobPosition}
              onChange={({ target }) => {
                setState({
                  ...state,
                  message: {
                    ...state.message,
                    jobPosition: target.value,
                  },
                })
              }}
              autoComplete="off"
              className="[field-sizing:content]"
              placeholder="Ej: Project Manager, Frontend Developer, Key Account Manager, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="job-role" className="font-semibold">
              <BadgeNumber>
                3
              </BadgeNumber>
              Descripción del rol
            </Label>
            <Textarea
              required
              id="job-role"
              name="job-role"
              value={state.message.jobRole}
              onChange={({ target }) => {
                setState({
                  ...state,
                  message: {
                    ...state.message,
                    jobRole: target.value,
                  },
                })
              }}
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="Desarrollo e implementación general de aplicaciones de software de front-end y back-end con un enfoque en..."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="stack" className="font-semibold">
              <BadgeNumber>
                4
              </BadgeNumber>
              Skills / Stack
            </Label>
            <Textarea
              required
              id="stack"
              name="stack"
              value={state.message.stack}
              onChange={({ target }) => {
                setState({
                  ...state,
                  message: {
                    ...state.message,
                    stack: target.value,
                  },
                })
              }}
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="+4 años como Frontend Developer, ingles fluido, remoto, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="soft" className="font-semibold">
              <BadgeNumber>
                5
              </BadgeNumber>
              Soft Skills
            </Label>
            <Textarea
              required
              id="soft"
              name="soft"
              value={state.message.softSkills}
              onChange={({ target }) => {
                setState({
                  ...state,
                  message: {
                    ...state.message,
                    softSkills: target.value,
                  },
                })
              }}
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="Trabajo en equipo, liderazgo, proactividad, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="benefits" className="font-semibold">
              <BadgeNumber>
                6
              </BadgeNumber>
              Que ofrecemos / Beneficios
            </Label>
            <Textarea
              required
              id="benefits"
              name="benefits"
              value={state.message.benefits}
              onChange={({ target }) => {
                setState({
                  ...state,
                  message: {
                    ...state.message,
                    benefits: target.value,
                  },
                })
              }}
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="100% remoto, flexibilidad horaria, desarrollo profesional, etc."
            />
          </div>
          <div className="grid gap-y-4 flex-wrap max-w-[400px]">
            <Label htmlFor="tone" className="font-semibold">
              ¿Qué estilo de tono prefieres para tu post?
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
            type="job"
            state={state}
            onDeleteFormat={() => setState({ ...state, format: EMPTY_JOB_FORMAT })}
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
      {/* <footer className="border-t bg-muted text-xs font-medium rounded-3xl p-2">
        Generando post...
      </footer> */}
    </>
  )
}
