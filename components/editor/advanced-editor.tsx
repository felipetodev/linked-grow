"use client";

import { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorContent,
  type JSONContent,
  EditorInstance,
} from "novel";
import { useDebouncedCallback } from "use-debounce";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";

import { TextButtons } from "./selectors/text-buttons";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import GenerativeMenuSwitch from "./selectors/generative-menu-switch";
import { HeaderEditor } from "./header-editor";
import { jsonToText, textToJSON } from "./utils";

const extensions = [...defaultExtensions];

export const defaultValue: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph"
    }
  ],
};

const Editor = ({ text, onEditText }: { text?: string, onEditText?: (text: string) => void }) => {
  const [initialContent, setInitialContent] = useState<undefined | JSONContent>();
  const [saveStatus, setSaveStatus] = useState("");
  const [openAI, setOpenAI] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      // window.localStorage.setItem("content", JSON.stringify(json));
      setSaveStatus("Guardado");

      onEditText && onEditText(jsonToText(json));

      const t = setTimeout(() => {
        setSaveStatus("");
      }, 2000);
      return () => clearTimeout(t);
    },
    500,
  );

  useEffect(() => {
    // const content = window.localStorage.getItem("content");

    // if (content) setInitialContent(JSON.parse(content))
    setInitialContent(text ? textToJSON(text) : defaultValue);
  }, []);

  if (!initialContent) return (
    <div className="h-[390px] pb-4">
      <Skeleton className="size-full" />
    </div>
  );

  return (
    <div className="relative">
      <div className="border rounded">
        {saveStatus && (
          <div className="absolute right-5 top-[calc(50px+16px)] z-10 mb-5 rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground">
            {saveStatus}
          </div>
        )}
        <EditorRoot>
          <EditorContent
            initialContent={initialContent}
            className="relative pb-4 rounded max-h-[600px] overflow-y-auto"
            extensions={extensions}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              attributes: {
                class: `px-4 prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none min-h-[300px] max-w-full !text-base`,
              }
            }}
            onUpdate={({ editor }) => {
              debouncedUpdates(editor);
              setSaveStatus("Guardando");
            }}
            slotAfter={<ImageResizer />}
            slotBefore={<HeaderEditor />}
          >
            <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
              <Separator orientation="vertical" />
              <TextButtons />
            </GenerativeMenuSwitch>
          </EditorContent>
        </EditorRoot>
      </div>
    </div>
  );
};

export {
  Editor
}
