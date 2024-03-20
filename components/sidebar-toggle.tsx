'use client'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Button } from '@/components/ui/button'
import { IconLayoutSidebar } from '@tabler/icons-react'

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      className="-ml-2 size-9 p-0 flex"
      onClick={() => {
        toggleSidebar()
      }}
    >
      <IconLayoutSidebar className="size-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}