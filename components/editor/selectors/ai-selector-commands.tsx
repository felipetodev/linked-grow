import {
  IconArrowDown,
  IconCheck,
  IconRefresh,
  IconPlayerTrackNext,
  IconTextWrap,
} from "@tabler/icons-react"
import { useEditor } from "novel";
import { getPrevText } from "novel/extensions";
import { CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";

const options = [
  {
    value: "improve",
    label: "Mejorar texto",
    icon: IconRefresh,
  },
  {
    value: "fix",
    label: "Corregir errores",
    icon: IconCheck,
  },
  {
    value: "shorter",
    label: "Acortar texto",
    icon: IconArrowDown,
  },
  {
    value: "longer",
    label: "Extender texto",
    icon: IconTextWrap,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();

  return (
    <>
      <CommandGroup heading="Editar o revisar selección">
        {options.map((option) => (
          <CommandItem
            disabled={!editor}
            key={option.value}
            value={option.value}
            onSelect={(value) => {
              if (!editor) return;
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content,
              );
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Usa la IA para más contenido">
        <CommandItem
          onSelect={() => {
            if (!editor) return;
            const text = getPrevText(editor, { chars: 5000 });
            onSelect(text, "continue");
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <IconPlayerTrackNext className="h-4 w-4 text-purple-500" />
          Continuar texto
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
