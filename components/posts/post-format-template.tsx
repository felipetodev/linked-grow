import { MemoizedReactMarkdown } from "@/components/ui/markdown"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  type FormatTemplateProps,
  type PostGenerator
} from "@/lib/types"

function PostFormat({ template, value }: Omit<FormatTemplateProps, 'type'>) {
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

type Props = {
  type: PostGenerator['type']
  templates: FormatTemplateProps[]
  selectedTemplateFormat: PostGenerator['format']
  onSelectTemplateFormat: (value: FormatTemplateProps["value"]) => void
}

export function PostFormatTemplate({ templates, selectedTemplateFormat, onSelectTemplateFormat }: Props) {
  return (
    <div className="grid grid-cols-2 border rounded overflow-hidden h-[520px]">
      <ScrollArea className="[&>div>*]:!flex [&>div>*]:!flex-col">
        <ToggleGroup
          type="single"
          defaultValue={selectedTemplateFormat.value}
          className="flex-wrap justify-start gap-0 pr-2.5"
          onValueChange={onSelectTemplateFormat}
        >
          {templates.map(({ template, value }) => (
            <PostFormat
              key={value}
              value={value}
              template={template}
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
          {selectedTemplateFormat.template}
        </MemoizedReactMarkdown>
      </ScrollArea>
    </div>
  )
}
