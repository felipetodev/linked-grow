"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PostFormat } from "@/components/posts/post-format"
import { IconSparkles } from "@tabler/icons-react"
import { DEFAULT_JOB_DESCRIPTION, EMPTY_JOB_FORMAT } from "@/lib/constants"

function BadgeNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 bg-primary text-secondary text-xs rounded-full border-2 mr-1">
      {children}
    </span>
  )
}

export function JobForm() {
  const [state, setState] = useState(DEFAULT_JOB_DESCRIPTION)
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 h-full px-1 overflow-y-auto">
        <form
          className="md:sticky md:top-6 h-full flex flex-col gap-y-6 mb-6"
          onSubmit={async (e) => {
            e.preventDefault()

            console.log(state)
          }}
        >
          <div className="grid w-full gap-y-4">
            <Label htmlFor="job" className="font-semibold">
              <BadgeNumber>
                1
              </BadgeNumber>
              Descripción del trabajo
            </Label>
            <Input
              required
              id="job"
              name="job"
              autoComplete="off"
              className="[field-sizing:content]"
              placeholder="Ej: Project Manager, Frontend Developer, Key Account Manager, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="stack" className="font-semibold">
              <BadgeNumber>
                2
              </BadgeNumber>
              Skills / Stack
            </Label>
            <Textarea
              required
              id="stack"
              name="stack"
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="+4 años como Frontend Developer, ingles fluido, remoto, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="soft" className="font-semibold">
              <BadgeNumber>
                3
              </BadgeNumber>
              Soft Skills
            </Label>
            <Textarea
              required
              id="soft"
              name="soft"
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="Trabajo en equipo, liderazgo, proactividad, etc."
            />
          </div>
          <div className="grid w-full gap-y-4">
            <Label htmlFor="benefits" className="font-semibold">
              <BadgeNumber>
                4
              </BadgeNumber>
              Que ofrecemos / Beneficios
            </Label>
            <Textarea
              required
              id="benefits"
              name="benefits"
              className="resize-none min-h-[100px] max-h-[300px] [field-sizing:content]"
              placeholder="100% remoto, flexibilidad horaria, desarrollo profesional, etc."
            />
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
      </div>
      {/* <footer className="border-t bg-muted text-xs font-medium rounded-3xl p-2">
        Generando post...
      </footer> */}
    </>
  )
}
