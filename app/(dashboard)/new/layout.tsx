import { FileUploadProvider } from "@/components/upload-files-context"

interface LayoutProps {
  children: React.ReactNode
}

export default function WriteLayout({ children }: LayoutProps) {
  return (
    <FileUploadProvider>
      {children}
    </FileUploadProvider>
  )
}
