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
import { EMPTY_FORMAT, FORMAT_TEMPLATES_EN } from "@/lib/constants"
import type { PostGenerator } from "@/lib/types"

type PostFormatDialogProps = {
  selectedTemplate?: number
  onFormatChange: (value: PostGenerator['format']) => void
  children: React.ReactNode
}

export function PostFormatDialog({
  selectedTemplate = 0,
  onFormatChange,
  children
}: PostFormatDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_TEMPLATES_EN[selectedTemplate])

  return (
    <Dialog
      onOpenChange={(open) => {
        // if modal is open but user don't change anything, keep previous state on close
        if (!open) {
          const t = setTimeout(() => setSelectedFormat(FORMAT_TEMPLATES_EN[selectedTemplate]), 500)
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
          selectedTemplateFormat={selectedFormat}
          onSelectTemplateFormat={(value) => {
            if (value) {
              setSelectedFormat(FORMAT_TEMPLATES_EN[Number(value)])
            } else {
              setSelectedFormat(EMPTY_FORMAT)
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
