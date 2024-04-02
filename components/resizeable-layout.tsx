'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconBox, IconBulb, IconSparkles } from "@tabler/icons-react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { TooltipProvider } from "./ui/tooltip"
import { Nav } from "./nav"
import { usePathname } from "next/navigation"

interface ResizeableProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children: React.ReactNode
}

export function Resizeable({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  children
}: ResizeableProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  // check route selected for Nav
  const path = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`

          }}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          {/* <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {isCollapsed ? (
              <IconBox size={24} />
            ) : (
              <div className="flex space-x-2">
                <IconBox size={24} />
                <Link href='/' className="text-lg font-semibold">
                  Mailbox
                </Link>
              </div>
            )}
          </div> */}
          {/* <Separator /> */}
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Generador de post",
                // label: "128",
                icon: IconSparkles,
                variant: path === '/' || path.includes('/templates') ? "default" : "ghost",
                href: '/'
              },
              {
                title: "Generador de ideas",
                // label: "9",
                icon: IconBulb,
                variant: path === '/ideas' ? "default" : "ghost",
                href: '/ideas'
              },
              {
                title: "Posts",
                // label: "2",
                icon: IconBox,
                variant: path === '/posts' ? "default" : "ghost",
                href: '/posts'
              }
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="!overflow-y-scroll"
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
