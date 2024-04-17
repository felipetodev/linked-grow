import { IconWorld } from "@tabler/icons-react";
import { PostUserAvatar } from "@/app/(dashboard)/posts/components/post-user-avatar";
import { useUser } from "@clerk/nextjs";

export function PostHeader() {
  const { user } = useUser()
  return (
    <div className="flex items-center px-4 mt-2">
      <div className="flex justify-center items-center size-[48px] border rounded-full bg-background ">
        <PostUserAvatar />
      </div>
      <div className="ml-2 flex-1 overflow-hidden px-1">
        <div className="font-semibold">
          {user?.fullName ?? user?.firstName ?? "Usuario"}
        </div>
        <div className="flex items-center text-xs opacity-60">
          Hace 2 horas{' '}
          <span className="block mx-1" aria-label="hidden">•</span>{' '}
          <IconWorld size={16} />
        </div>
      </div>
    </div>
  )
}
