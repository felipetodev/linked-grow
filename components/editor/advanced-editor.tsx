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
import { Separator } from "../ui/separator";
import GenerativeMenuSwitch from "./selectors/generative-menu-switch";
import { HeaderEditor } from "./header-editor";

const extensions = [...defaultExtensions];

function textToJSON(text: string): JSONContent {
  return {
    type: "doc",
    content: text.split("\n").map((line) => {
      if (line === "") return {
        type: "paragraph",
      }
      if (line.includes("**")) {
        let startIndex = line.indexOf("**");
        let endIndex = line.lastIndexOf("**");

        if (startIndex !== -1 && endIndex !== -1) {
          const extractedText = line.substring(startIndex + 2, endIndex);
          const beforeText = line.substring(0, startIndex);
          const afterText = line.substring(endIndex + 2);

          return {
            type: "paragraph",
            content: [
              ...beforeText ? [
                {
                  type: "text",
                  text: beforeText,
                },
              ] : [],
              {
                type: "text",
                text: extractedText,
                marks: [
                  {
                    type: "bold",
                  },
                ],
              },
              ...afterText ? [
                {
                  type: "text",
                  text: afterText,
                },
              ] : [],
            ],
          }
        } else {
          return {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: line,
              },
            ],
          }
        }
      }
      return {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: line,
          },
        ],
      }
    })
  }
}

function jsonToText(json: JSONContent): string {
  if (!json.content) return "";
  return json.content.map((content) => {
    if (content.type === "paragraph") {
      return content.content?.map((text) => {
        if (text.type === "text" && text.marks) {
          const mark = text.marks.map(mark => mark.type)
          if (mark.includes("bold") && mark.includes("italic")) {
            return `**_${text.text}_**`;
          }
          if (mark.includes("bold")) {
            return `**${text.text}**`;
          }
          if (mark.includes("italic")) {
            return `*${text.text}*`;
          }
          return text.text;
        }
        if (text.type === "text") return text.text;
        return "";
      }).join("");
    }
    return "";
  }).join("\n");
}

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
    setInitialContent(text ? textToJSON(text) : {});
  }, []);

  if (!initialContent) return null;

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
                class: `px-4 prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full !text-base`,
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

export default Editor;
