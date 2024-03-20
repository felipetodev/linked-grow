"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@/lib/hooks/use-sidebar"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
    <SidebarProvider>
      {children}
    </SidebarProvider>
  </NextThemesProvider>
}
