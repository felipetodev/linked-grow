import { Suspense } from "react"
import MembershipSSR from "@/components/memberships-ssr"
import { FileUploadProvider } from "@/components/upload-files-context"

interface LayoutProps {
  children: React.ReactNode
}

export default function WriteLayout({ children }: LayoutProps) {
  return (
    <FileUploadProvider>
      <div className="hidden xl:grid md:grid-cols-2 bg-background px-4 py-2 rounded mb-2">
        <div className="flex items-center border-r font-semibold">
          Editar / Crear Post
          <Suspense fallback={<></>}>
            <MembershipSSR />
          </Suspense>
        </div>
        <div className="ml-4 flex items-center font-semibold">
          Post Preview
        </div>
      </div>
      {children}
    </FileUploadProvider>
  )
}
