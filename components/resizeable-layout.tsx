'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconBox, IconBuildingCarousel, IconBulb, IconChartLine, IconShare3, IconSparkles } from "@tabler/icons-react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button, buttonVariants } from "@/components/ui/button"
import { Nav } from "@/components/nav"
import { cn } from "@/lib/utils"

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
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={15}
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
            "min-w-[60px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center pt-4 pb-2",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button size="icon" className="size-10 p-0 font-bold bg-purple-500 text-white hover:bg-purple-500/60 group/link">
                    <IconShare3 size={20} className="transition-transform group-hover/link:scale-125" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  Nuevo post
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/new"
                className={cn(
                  buttonVariants(),
                  "w-full font-semibold bg-purple-500 text-white hover:bg-purple-500/60 rounded-3xl text-base"
                )}
              >
                <IconShare3 size={20} className="mr-2" /> Post
              </Link>
            )}
          </div>

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
                title: "Carousel templates",
                // label: "2",
                icon: IconBuildingCarousel,
                variant: path === '/carousels' ? "default" : "ghost",
                href: '/carousels'
              },
              {
                title: "Posts",
                // label: "2",
                icon: IconBox,
                variant: path === '/posts' ? "default" : "ghost",
                href: '/posts'
              },
              {
                title: "Analíticas",
                // label: "2",
                icon: IconChartLine,
                variant: path === '/analytics' ? "default" : "ghost",
                href: '/analytics',
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
