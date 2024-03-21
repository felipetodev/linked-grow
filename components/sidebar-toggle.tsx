'use client'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Button } from '@/components/ui/button'
import { IconChevronCompactLeft, IconChevronCompactRight } from '@tabler/icons-react'

export function SidebarToggle() {
  const { toggleSidebar, isSidebarOpen } = useSidebar()

  return (
    <Button
      variant="ghost"
      className="size-9 p-0 flex"
      onClick={() => {
        toggleSidebar()
      }}
    >
      {isSidebarOpen ? <IconChevronCompactLeft /> : <IconChevronCompactRight />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}