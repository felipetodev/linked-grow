import { IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PostFormatDialog } from "@/components/posts/post-format-dialog";
import { type JobDescriptionProps, type PostGenerator } from "@/lib/types";

type PostFormatProps = {
  type: 'post'
  state: PostGenerator;
  onDeleteFormat: () => void;
  onFormatChange: (value: PostGenerator['format']) => void
} | {
  type: 'job'
  state: JobDescriptionProps;
  onDeleteFormat: () => void;
  onFormatChange: (value: JobDescriptionProps['format']) => void
}

export function PostFormat({ state, type, onFormatChange, onDeleteFormat }: PostFormatProps) {
  return (
    <div className="grid w-full gap-y-4">
      <Label htmlFor="format" className="font-semibold">
        Selecciona un formato de post
      </Label>

      {state.format?.template ? (
        <div className="p-4 border rounded max-w-md">
          <div className="grid">
            <h2 className="truncate overflow-hidden">
              {state.format.template.split(' ', 12).join(' ')}
            </h2>
            <h4 className="truncate text-xs opacity-50">
              {state.format.template.split(' ').slice(12).join(' ').split(' ', 10).join(' ')}
            </h4>
          </div>
          <div className="flex justify-between mt-2">
            <PostFormatDialog
              type={type}
              onFormatChange={onFormatChange}
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
              onClick={onDeleteFormat}
            >
              <IconX size={20} className="mr-1" /> Remover
            </Button>
          </div>
        </div>
      ) : (
        <PostFormatDialog
          type={type}
          onFormatChange={onFormatChange}
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
  )
}
