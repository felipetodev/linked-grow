import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { IconPhoto } from "@tabler/icons-react"

export function PostUserAvatar() {
  const { user } = useUser()

  return (
    <div className="grid place-items-center h-12 w-12 rounded-full bg-[#f2f4f7]">
      {user?.imageUrl ? (
        <Image
          src={user?.imageUrl}
          alt={user.fullName ?? "User avatar"}
          width={50}
          height={50}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <IconPhoto className="text-gray-400" size={20} />
      )}
    </div>
  )
}
