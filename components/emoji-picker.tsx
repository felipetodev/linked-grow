import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IconMoodSmile } from "@tabler/icons-react";
import EmojiPickerComponent, { EmojiStyle, Theme } from 'emoji-picker-react';
import { useTheme } from "next-themes";
import { useEditor } from "novel";

export function EmojiPicker() {
  const { resolvedTheme } = useTheme()
  const { editor } = useEditor();
  if (!editor) return null;

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

  const themeMap = {
    light: Theme.LIGHT,
    dark: Theme.DARK,
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="ml-1 p-2.5">
          <IconMoodSmile className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0 border-none rounded-[8px]">
        <EmojiPickerComponent
          lazyLoadEmojis
          searchPlaceHolder="Buscar"
          emojiStyle={EmojiStyle.APPLE}
          theme={themeMap[currentTheme]}
          onEmojiClick={({ emoji }) => {
            editor.chain().focus().insertContent(emoji).run()
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
