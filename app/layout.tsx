import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Header } from "@/components/header";
import { Providers } from '@/components/providers'
import { Resizeable as ResizeableLayout } from '@/components/resizeable-layout'
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: "LinkedGrow - AI",
  description: "Grow your audience on LinkedIn with AI",
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          inter.className,
        )}
      >
        <Toaster position="top-center" richColors />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col min-h-screen bg-muted/50">
            <Header />
            <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
              <ResizeableLayout
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
                navCollapsedSize={4}
              >
                <main className="p-6 flex flex-col h-full">
                  {children}
                </main>
              </ResizeableLayout>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
