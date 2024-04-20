import { IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PostFormatDialog } from "@/components/posts/post-format-dialog";
import { type PostGenerator } from "@/lib/types";

type PostFormatProps = {
  type: PostGenerator<string>['type']
  state: Omit<PostGenerator<string>, 'message'>;
  onDeleteFormat: () => void;
  onFormatChange: (value: PostGenerator<string>['format']) => void
}

export function PostFormat({ state, type, onFormatChange, onDeleteFormat }: PostFormatProps) {
  const { format } = state;
  return (
    <div className="grid w-full gap-y-4">
      <Label htmlFor="format" className="font-semibold">
        Selecciona un formato de post
      </Label>

      {format?.template ? (
        <div className="p-4 border rounded max-w-md">
          <div className="grid">
            <h2 className="truncate overflow-hidden">
              {format.template.split(' ', 12).join(' ')}
            </h2>
            <h4 className="truncate text-xs opacity-50">
              {format.template.split(' ').slice(12).join(' ').split(' ', 10).join(' ')}
            </h4>
          </div>
          <div className="flex justify-between mt-2">
            <PostFormatDialog
              type={type}
              onFormatChange={onFormatChange}
              selectedTemplate={Number(format.value)}
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
