import { Fragment, useEffect, type ReactNode } from "react";
import { EditorBubble, useEditor } from "novel";
import { AISelector } from "./ai-selector";
import { removeAIHighlight } from "novel/extensions";
import { Button } from "@/components/ui/button";
import { IconSparkles } from "@tabler/icons-react";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
  }, [open]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor?.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-purple-500 font-bold"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <IconSparkles className="h-5 w-5" />
            Potenciar con IA
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
