import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
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
import { EMPTY_FORMAT, FORMAT_TEMPLATES_EN } from "@/lib/constants"
import type { PostGenerator } from "@/lib/types"

function PostFormat({ template, value }: { template: string, value: string }) {
  return (
    <ToggleGroupItem
      value={value}
      aria-label={value}
      variant='default'
      className="grid h-[70px] justify-normal py-2 text-left w-full border-b last:border-none rounded-none"
    >
      <h2 className="truncate">
        {template.split(' ', 12).join(' ')}
      </h2>
      <h4 className="truncate text-xs opacity-50">
        {template.split(' ').slice(12).join(' ').split(' ', 10).join(' ')}
      </h4>
    </ToggleGroupItem>
  )
}

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
        <div className="grid grid-cols-2 border rounded overflow-hidden h-[520px]">
          <ScrollArea className="[&>div>*]:!flex [&>div>*]:!flex-col">
            <ToggleGroup
              type="single"
              defaultValue={selectedFormat.value}
              className="flex-wrap justify-start gap-0 pr-2.5"
              onValueChange={(value) => {
                if (value) {
                  setSelectedFormat(FORMAT_TEMPLATES_EN[Number(value)])
                } else {
                  setSelectedFormat(EMPTY_FORMAT)
                }
              }}
            >
              {FORMAT_TEMPLATES_EN.map(({ format, value }) => (
                <PostFormat
                  key={value}
                  value={value}
                  template={format}
                />
              ))}
            </ToggleGroup>
          </ScrollArea>

          <ScrollArea className="border-l p-4">
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-sm"
              components={{
                li({ children }) {
                  return <li className="my-0.5 last:mb-0">{children}</li>
                },
                p({ children }) {
                  return <p className="mb-1 last:mb-0">{children}</p>
                }
              }}
            >
              {selectedFormat.format}
            </MemoizedReactMarkdown>
          </ScrollArea>
        </div>
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
