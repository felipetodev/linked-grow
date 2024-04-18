import { useEditor } from "novel";
import {
  IconBold,
  IconItalic,
} from "@tabler/icons-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EmojiPicker } from "@/components/emoji-picker";
import { HeaderFileUpload } from "./header-file-upload";

type SelectorItem = {
  name: string;
  icon: any;
  disabled?: boolean;
  command: (editor: ReturnType<typeof useEditor>["editor"]) => void;
  isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean;
};

export function HeaderEditor() {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor?.isActive("bold") ?? false,
      command: (editor) => editor?.chain().focus().toggleBold().run(),
      disabled: !editor?.can().chain().focus().toggleBold().run(),
      icon: IconBold,
    },
    {
      name: "italic",
      isActive: (editor) => editor?.isActive("italic") ?? false,
      command: (editor) => editor?.chain().focus().toggleItalic().run(),
      disabled: !editor?.can().chain().focus().toggleItalic().run(),
      icon: IconItalic,
    }
  ];

  const itemsActiveValues = items
    .filter(({ isActive }) => isActive(editor))
    .map(({ name }) => name)

  return (
    <header className="sticky top-0 border-b py-2 mb-4 bg-background z-10 px-4">
      <div className="flex items-center">
        <ToggleGroup
          type="multiple"
          value={itemsActiveValues}
        >
          {items.map((item) => (
            <ToggleGroupItem
              size="sm"
              variant="outline"
              key={item.name}
              value={item.name}
              disabled={item.disabled}
              onClick={() => item.command(editor)}
            >
              <item.icon className="size-4" />
            </ToggleGroupItem>

          ))}
        </ToggleGroup>
        <EmojiPicker />
        <HeaderFileUpload />
      </div>
    </header>
  )
}
