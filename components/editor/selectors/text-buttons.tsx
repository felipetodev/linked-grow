import { cn } from "@/lib/utils";
import { EditorBubbleItem, useEditor } from "novel";
import {
  IconBold,
  IconItalic,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type SelectorItem = {
  name: string;
  icon: any;
  command: (editor: ReturnType<typeof useEditor>["editor"]) => void;
  isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean;
};

export const TextButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor?.isActive("bold") ?? false,
      command: (editor) => editor?.chain().focus().toggleBold().run(),
      icon: IconBold,
    },
    {
      name: "italic",
      isActive: (editor) => editor?.isActive("italic") ?? false,
      command: (editor) => editor?.chain().focus().toggleItalic().run(),
      icon: IconItalic,
    },
  ];

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
