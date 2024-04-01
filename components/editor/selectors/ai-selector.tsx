"use client";

import { useState } from "react";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { useCompletion } from "ai/react";
import { useEditor } from "novel";
import Markdown from "react-markdown";
import AISelectorCommands from "./ai-selector-commands";
import AICompletionCommands from "./ai-completion-command";
import { IconArrowUp, IconLoader, IconSparkles } from "@tabler/icons-react";
import { addAIHighlight } from "novel/extensions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AISelectorProps {
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState("");

  const { completion, complete, isLoading } = useCompletion({
    // id: "" keep empty to reset the completion
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        alert("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      <CommandList>
        {hasCompletion && (
          <div className="flex max-h-[400px]">
            <ScrollArea>
              <div className="prose p-2 px-4 prose-sm">
                <Markdown>{completion}</Markdown>
              </div>
            </ScrollArea>
          </div>
        )}

        {isLoading && (
          <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
            <IconSparkles className="mr-2 h-4 w-4 shrink-0  " />
            IA pensando...
            <div className="ml-2 mt-1">
              <IconLoader className="animate-spin h-4 w-4" />
            </div>
          </div>
        )}
        {!isLoading && (
          <>
            <div className="relative">
              <CommandInput
                value={inputValue}
                onValueChange={setInputValue}
                autoFocus
                placeholder={
                  hasCompletion
                    ? "Que quieres hacer con este texto?"
                    : "Edita o mejora tu texto..."
                }
                onFocus={() => {
                  if (!editor) return;
                  addAIHighlight(editor)
                }}
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
                onClick={() => {
                  if (completion)
                    return complete(completion, {
                      body: { option: "zap", command: inputValue },
                    }).then(() => setInputValue(""));

                  if (!editor) return;

                  const slice = editor.state.selection.content();
                  const text = editor.storage.markdown.serializer.serialize(
                    slice.content,
                  );

                  complete(text, {
                    body: { option: "zap", command: inputValue },
                  }).then(() => setInputValue(""));
                }}
              >
                <IconArrowUp className="h-4 w-4" />
              </Button>
            </div>
            {hasCompletion ? (
              <AICompletionCommands
                onDiscard={() => {
                  if (!editor) return;
                  editor.chain().unsetHighlight().focus().run();
                  onOpenChange(false);
                }}
                completion={completion}
              />
            ) : (
              <AISelectorCommands
                onSelect={(value, option) =>
                  complete(value, { body: { option } })
                }
              />
            )}
          </>
        )}
      </CommandList>
    </Command>
  );
}
