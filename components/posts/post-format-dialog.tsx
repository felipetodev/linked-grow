import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { PostFormatTemplate } from "./post-format-template"
import { EMPTY_FORMAT, EMPTY_JOB_FORMAT, FORMAT_JOB_TEMPLATES_ES, FORMAT_TEMPLATES_EN } from "@/lib/constants"
import { type PostGenerator } from "@/lib/types"

type PostFormatDialogProps = {
  type: PostGenerator<string>['type']
  selectedTemplate?: number
  onFormatChange: (value: PostGenerator<string>['format']) => void
  children: React.ReactNode
}

const FORMAT_TYPE_TEMPLATE = (selected: number, type: PostGenerator<string>['type']) => {
  switch (type) {
    case 'post':
      return FORMAT_TEMPLATES_EN[selected]
    case 'job':
      return FORMAT_JOB_TEMPLATES_ES[selected]
    default:
      return FORMAT_TEMPLATES_EN[selected]
  }
}

export function PostFormatDialog({
  selectedTemplate = 0,
  onFormatChange,
  type,
  children
}: PostFormatDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_TYPE_TEMPLATE(selectedTemplate, type))

  return (
    <Dialog
      onOpenChange={(open) => {
        // if modal is open but user don't change anything, keep previous state on close
        if (!open) {
          const t = setTimeout(() => setSelectedFormat(FORMAT_TYPE_TEMPLATE(selectedTemplate, type)), 500)
          return () => clearTimeout(t)
        }
      }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Selecciona un formato para tu post
          </DialogTitle>
          <DialogDescription>
            Elige un formato para tu post y nosotros nos encargaremos de darle vida. ✨
          </DialogDescription>
        </DialogHeader>
        <PostFormatTemplate
          type={type}
          templates={type === 'post' ? FORMAT_TEMPLATES_EN : FORMAT_JOB_TEMPLATES_ES}
          selectedTemplateFormat={selectedFormat}
          onSelectTemplateFormat={(value) => {
            if (value) {
              setSelectedFormat(FORMAT_TYPE_TEMPLATE(Number(value), type))
            } else {
              setSelectedFormat(type === 'post' ? EMPTY_FORMAT : EMPTY_JOB_FORMAT)
            }
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => onFormatChange(selectedFormat)}>
              Usar formato de post
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
