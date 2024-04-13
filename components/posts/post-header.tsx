import { IconWorld } from "@tabler/icons-react";

export function PostHeader() {
  return (
    <div className="flex items-center">
      <div className="flex justify-center items-center size-[48px] p-4 border rounded-full bg-background ">
        RE
      </div>
      <div className="ml-2 flex-1 overflow-hidden px-1">
        <div className="font-semibold">
          Refact
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
