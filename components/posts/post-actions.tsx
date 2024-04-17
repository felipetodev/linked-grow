import { usePathname } from "next/navigation";
import { IconBookmark, IconEdit } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePost } from "@/components/posts/post-context";
import { PostEditDrawer } from "@/components/posts/post-edit-drawer";
import { useClerk, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export function PostActions() {
  const { postId, isSuccess, isLoading, hasChanges, onSave } = usePost();
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  return (
    <footer className="flex gap-x-4 w-full px-4">
      {isSuccess ? (
        <Button
          size='sm'
          onClick={onSave}
          disabled={isSuccess}
          className='size-9 p-0 w-full bg-green-600 text-white cursor-not-allowed'
        >
          Post publicado ✨
        </Button>
      ) : (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {isSignedIn ? (
              <Button
                size='sm'
                disabled={(!hasChanges && Boolean(postId))}
                className={cn("size-9 p-0 w-full", {
                  'bg-green-600 text-white cursor-not-allowed': (!hasChanges && postId)
                })}
                onClick={onSave}
              >
                {isLoading && <span className="mr-1.5">Guardando...</span>}
                <IconBookmark size={20} />
              </Button>

            ) : (
              <Button
                size='sm'
                className="size-9 p-0 w-full"
                onClick={() => clerk.openSignIn({ redirectUrl: pathname })}
              >
                <IconBookmark size={20} />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent className="text-xs flex items-center gap-4">
            Guardar post
          </TooltipContent>
        </Tooltip>
      )}
      {isSignedIn ? (
        <Tooltip delayDuration={0}>
          <PostEditDrawer
            // postId={postId}
            // text={editText ?? text}
            disableSave={(!hasChanges && Boolean(postId))}
          // onEditText={setEditText}
          // onSavePost={handleSavePost}
          >
            <TooltipTrigger asChild>
              <Button size='sm' className="size-9 p-0 w-full">
                <IconEdit size={20} />
              </Button>
            </TooltipTrigger>
          </PostEditDrawer>
          <TooltipContent
            className="text-xs flex items-center gap-4"
          >
            Editar post
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              size='sm'
              className="size-9 p-0 w-full"
              onClick={() => clerk.openSignIn({ redirectUrl: pathname })}
            >
              <IconEdit size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="text-xs flex items-center gap-4"
          >
            Editar post
          </TooltipContent>
        </Tooltip>
      )}
    </footer>
  )
}
