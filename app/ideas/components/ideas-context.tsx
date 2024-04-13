"use client"

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActions, useUIState } from "ai/rsc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdeasForm } from "./ideas-form";
import { IdeasPublished } from "./ideas-published";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AI, UIState } from "@/lib/post/actions";
import { createUrl } from "@/lib/utils";
import { toast } from "sonner";

type IdeasContextProps = {
  messages: UIState
  savedIdeas: Array<{ id: string }>
  inputRef: React.RefObject<HTMLInputElement>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onSaveIdea: (e: { message: string, id: string }) => void
};

export const IdeasContext = React.createContext<IdeasContextProps | null>(null);

function useIdeas() {
  const context = React.useContext(IdeasContext);

  if (!context) {
    throw new Error("useIdeas must be used within a <IdeasTabs />");
  }

  return context;
}

const IdeasTabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((_, ref) => {
  const [savedIdeas, setSavedIdeas] = React.useState<{ id: string }[]>([])
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter();
  const searchParams = useSearchParams();

  const ideas = useQuery(api.ideas.getPostsIdeas)
  const createPostIdea = useMutation(api.ideas.createPostIdea)
  const deleteIdea = useMutation(api.ideas.deleteIdea)

  React.useEffect(() => {
    if (!searchParams.get("status")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("status", "generated");

      router.push(createUrl('/ideas', params));
    }
  }, [router, searchParams])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const message = inputRef.current?.value.trim()

      if (!message) return toast.warning('Debes ingresar un mensaje')
      const responseMessage = await submitUserMessage({ message, type: 'ideas' })
      setMessages([responseMessage])
    } catch (error) {
      console.error(error)
    }
  }

  const onSaveIdea = async ({ message, id }: { message: string, id: string }) => {
    try {
      await createPostIdea({ content: message })
      setSavedIdeas([...savedIdeas, { id }])
      toast.success("Idea guardada")
    } catch (error) {
      toast.error("Error al guardar post idea")
    }
  }

  return (
    <IdeasContext.Provider
      value={{
        messages,
        inputRef,
        savedIdeas,
        onSubmit,
        onSaveIdea
      }}
    >
      <Tabs
        ref={ref}
        defaultValue={searchParams.get("status") || "generated"}
        onValueChange={value => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("status", value);

          router.push(createUrl('/ideas', params));
        }}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="generated">Borradores</TabsTrigger>
          <TabsTrigger value="saved">
            Publicados
            {ideas?.length! > 0 && (
              <span className="ml-2 text-sm">
                ({ideas?.length})
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generated">
          <IdeasForm />
        </TabsContent>
        <TabsContent value="saved">
          <IdeasPublished
            ideas={ideas}
            onDelete={async (id) => {
              try {
                await deleteIdea({ ideaId: id })
                toast.success("Idea eliminada")
              } catch {
                toast.error("Oops! Error al eliminar idea")
              }
            }}
          />
        </TabsContent>
      </Tabs>
    </IdeasContext.Provider >
  );
})

IdeasTabs.displayName = "IdeasTabs";

export {
  IdeasTabs,
  useIdeas,
};
