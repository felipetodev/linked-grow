import { FileUploadProvider } from "@/components/upload-files-context";
import { AI } from "@/lib/post/actions";

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <FileUploadProvider>
      <AI>
        {children}
      </AI>
    </FileUploadProvider>
  )
}
