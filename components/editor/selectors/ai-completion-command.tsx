import { useEditor } from "novel";
import { IconCheck, IconQuote, IconTrash } from "@tabler/icons-react";
import { CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";

const AICompletionCommands = ({
  completion,
  onDiscard,
}: {
  completion: string;
  onDiscard: () => void;
}) => {
  const { editor } = useEditor();
  return (
    <>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            const selection = editor?.view.state.selection;

            if (!selection) return;

            editor
              .chain()
              .focus()
              .insertContentAt(
                {
                  from: selection.from,
                  to: selection.to,
                },
                completion,
              )
              .run();
          }}
        >
          <IconCheck className="h-4 w-4 text-muted-foreground" />
          Reemplazar selección
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            const selection = editor?.view.state.selection;
            if (!selection) return;
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run();
          }}
        >
          <IconQuote className="h-4 w-4 text-muted-foreground" />
          Insertar después
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <IconTrash className="h-4 w-4 text-muted-foreground" />
          Descartar
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AICompletionCommands;
