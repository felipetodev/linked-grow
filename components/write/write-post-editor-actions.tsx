import { Button } from "@/components/ui/button";
import { IconSend } from "@tabler/icons-react";
import { Editor } from "@/components/editor/advanced-editor";
import { PostConfirmModal } from "@/components/posts/post-confirm-modal";
import { useWritePost } from "./write-post";
import TimeAgo from "@/lib/hooks/use-time-ago";

export function WritePostEditorActions() {
  const {
    content,
    isLoading,
    isSuccess,
    isPublished,
    urlRef,
    updatedAt,
    onPublishDraft,
    onSetContent,
    onSaveDraft
  } = useWritePost()
  return (
    <>
      <Editor
        text={content}
        onEditText={onSetContent}
      />
      <div className="mt-4 ml-auto space-x-2 xl:space-x-4">
        {isPublished ? (
          <Button className="bg-green-600 text-white" disabled>
            <span className="mr-1">Publicado</span>
            {updatedAt && <TimeAgo timestamp={updatedAt} />}
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={onSaveDraft}
          >
            Guardar borrador
          </Button>
        )}
        <PostConfirmModal
          isSuccess={isSuccess}
          urlRef={urlRef}
          onPublish={onPublishDraft}
          isLoading={isLoading}
          isPublished={isPublished}
        >
          <Button className="group">
            Publicar
            <IconSend
              size={20}
              className="ml-2 transition-transform group-hover:rotate-12 group-hover:scale-125"
            />
          </Button>
        </PostConfirmModal>
      </div>
    </>
  )
}
